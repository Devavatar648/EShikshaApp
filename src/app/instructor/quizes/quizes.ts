import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course-service';
import { map } from 'rxjs';
import { QuizService } from '../../services/quiz-service';

@Component({
  selector: 'app-quizes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quizes.html',
  styleUrl: './quizes.css',
})
export class Quizes {
  private courseService = inject(CourseService);
  private quizService = inject(QuizService);

   quizForm!: FormGroup;
  quizList = signal<any[]>([]);
  isEditing = false;
  editingIndex: number | null = null;
  selectedQuiz: any = null; 

  fb=inject(FormBuilder)

  // API DATA - Mocked for consistency
  instructorCourses = signal<{ id: string, title: string }[]>([]);

  ngOnInit(): void {
    this.courseService.instructorCourses$
      .pipe(
        map((carray) => {
          if (!carray) {
            return [];
          }
          return carray.map(c => ({ id: c._id??"", title: c.title }))
        }
        )
      )
      .subscribe(courses => {
        if (courses) {
          this.instructorCourses.set(courses)
        }
      })

    this.initForm();
    this.addQuestion();
  }

  initForm() {
    this.quizForm = this.fb.group({
      courseId: ['', Validators.required],
      title: ['', Validators.required],
      markPerQuestion: [null, [Validators.required, Validators.min(1)]],
      timeLimit: [null, [Validators.required, Validators.min(1)]],
      questions: this.fb.array([])
    });
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  
get filteredQuizzes() {
  const selectedCourseId = this.quizForm.get('courseId')?.value;

  // If 'all' is selected or nothing is selected, show every quiz
  if (!selectedCourseId || selectedCourseId === 'all') {
    return this.quizList;
  }

  
  return this.quizList().filter(q => q.courseId == selectedCourseId);
}

  
  getCourseName(id: string) {
    return this.instructorCourses().find(c => c.id == id)?.title || 'Course';
  }

  addQuestion() {
    const qGroup = this.fb.group({
      questionText: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      correctAnswer: ['', Validators.required]
    });
    this.questions.push(qGroup);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  saveQuiz() {
    if (this.quizForm.invalid) return;

    if (this.isEditing && this.editingIndex !== null) {
      this.quizList()[this.editingIndex] = this.quizForm.value;
      this.isEditing = false;
      this.editingIndex = null;
    } else {
      this.quizList().push(this.quizForm.value);
    }

    // Reset but keep the course selected for better UX
    const currentCourse = this.quizForm.get('courseId')?.value;
    this.resetForm();
    this.quizForm.patchValue({ courseId: currentCourse });
  }

  editQuiz(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    const quiz = this.quizList()[index];

    this.questions.clear();
    quiz.questions.forEach((q: any) => {
      this.questions.push(this.fb.group(q));
    });

    this.quizForm.patchValue({
      courseId: quiz.courseId, // Added
      title: quiz.title,
      markPerQuestion: quiz.markPerQuestion,
      timeLimit: quiz.timeLimit
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteQuiz(index: number) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizList().splice(index, 1);
    }
  }
  
  viewQuiz(quiz: any) {
    this.selectedQuiz = quiz;
  }

  resetForm() {
    this.isEditing = false;
    this.editingIndex = null;
    this.quizForm.reset();
    this.questions.clear();
    this.addQuestion();
  }

  getCurrentDate(): string {
    
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = (today.getDate()+3).toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getQuizesByCourseId(event:any){
    console.log(event.target.value);
    this.quizService.getQuizes(event.target.value).subscribe({
      next:res=>{
        this.quizList.set(res.result);
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
