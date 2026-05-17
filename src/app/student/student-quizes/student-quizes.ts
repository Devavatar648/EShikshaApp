import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz-service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
}
@Component({
  selector: 'app-student-quizes',
  imports: [FormsModule,CommonModule],
  templateUrl: './student-quizes.html',
  styleUrl: './student-quizes.css',
})
export class StudentQuizes {
  private quizService = inject(QuizService);
  private activatedRouter = inject(ActivatedRoute);

  quizData = signal<Quiz|null>(null);
  isQuizStarted = signal<boolean>(false);
  isQuizSubmitted = signal<boolean>(false);
  totalTime = signal<number>(0);
  studentAnswers:string[] = [''];
  seconds = signal<number>(0);

  ngOnInit(){
    const {courseId, id } = this.activatedRouter.snapshot.params;
    this.quizService.getQuizById(courseId, id).subscribe({
      next:res=>{
        this.quizData.set(res.result);
        this.totalTime.set(res.result.timeLimit);
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  startQuiz() {
    this.isQuizStarted.set(true);
    this.startTimer();
  }

  startTimer(){
    const timerId = setInterval(()=>{
      if(this.seconds()==0){
        this.totalTime.update(t=>--t);
        this.seconds.set(59);
      }else{
        this.seconds.update(s=>--s);
      }
      if(this.totalTime()===0 && this.seconds()===0){
        clearInterval(timerId);
      }
    },1000);
  }

  retakeQuiz() {
    this.isQuizStarted.set(false);
  }



  getTimer(){
    let hour = Math.floor(this.totalTime()/60);
    let minute = Math.floor(this.totalTime()%60);
    return `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:${String(this.seconds()).padStart(2,'0')}`;
  }

  submitQuiz() {
    console.log(this.studentAnswers);
    // this.finalScore = 0;
    // this.questions.forEach((q, index) => {
    //   if (this.studentAnswers[index] === q.correctAnswer) {
    //     this.finalScore++;
    //   }
    // });
    // this.quizSubmitted = true;
  }

}
