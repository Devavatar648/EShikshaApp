import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quizes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quizes.html',
  styleUrl: './quizes.css',
})
export class Quizes {
  quizForm!: FormGroup;
  quizList: any[] = [];
  isEditing = false;
  editingIndex: number | null = null;
  selectedQuiz: any = null; 

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.addQuestion();
  }

  initForm() {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      totalMarks: [null, [Validators.required, Validators.min(1)]],
      timeLimit: [null, [Validators.required, Validators.min(1)]],
      questions: this.fb.array([])
    });
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
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
     
      this.quizList[this.editingIndex] = this.quizForm.value;
      this.isEditing = false;
      this.editingIndex = null;
    } else {
     
      this.quizList.push(this.quizForm.value);
    }

    this.resetForm();
  }

  editQuiz(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    const quiz = this.quizList[index];

    
    this.questions.clear();
    quiz.questions.forEach((q: any) => {
      this.questions.push(this.fb.group(q));
    });

    
    this.quizForm.patchValue({
      title: quiz.title,
      totalMarks: quiz.totalMarks,
      timeLimit: quiz.timeLimit
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteQuiz(index: number) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizList.splice(index, 1);
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
}
