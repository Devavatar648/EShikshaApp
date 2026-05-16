import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  isQuizStarted: boolean = false;
  msg!:string;


  questions: Question[] = [
    {
      id: 1,
      question: "Which directive is used for two-way data binding in Angular?",
      options: ["*ngIf", "ngModel", "*ngFor", "ngStyle"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "What is the default port for an Angular development server?",
      options: ["3000", "8080", "4200", "5000"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "Why you exist?",
      options: ["don't know", "doesn't matter", "actually matters", "for the 7 crore"],
      correctAnswer: 3

    },
    {
      id: 4,
      question: "Who is not blood related to goku?",
      options: ["Goten", "Vegeta", "Trunks", "Gohan"],
      correctAnswer: 1

    }
  ];

  studentAnswers: any = {};
  finalScore: number = 0;
  quizSubmitted: boolean = false;

  InitialValue = signal(0);
  BoundedTime = 0.5;
  minuteValue = signal(0);
  hourValue = signal(0);
  secondValue = signal(0);

  startQuiz() {
    this.isQuizStarted = true;
    this.quizSubmitted = false;

    const intervalId = setInterval(() => {
      this.InitialValue.set(this.InitialValue() + 1);
      this.secondValue.set(this.secondValue() + 1);
      if (this.InitialValue() === this.BoundedTime * 60) {
        clearInterval(intervalId);
        this.submitQuiz();
      }
      if (this.secondValue() >= 60) {
        this.minuteValue.set(this.minuteValue() + 1);
        this.secondValue.set(0);
      }
      if (this.minuteValue() >= 60) {
        this.hourValue.set(this.hourValue() + 1);
      }
      if (this.InitialValue() === this.BoundedTime*60*0.9) {
        alert("you are running out of time");
        this.msg="You are out of time";
      }
    }, 1000);

  }

  retakeQuiz() {
    this.isQuizStarted = false;
    this.quizSubmitted = false;
    this.studentAnswers = {};
    this.finalScore = 0;
    this.InitialValue.set(0);
    this.secondValue.set(0);
    this.minuteValue.set(0);
    this.hourValue.set(0);
  }

  getTimer(){
    const hour =this.hourValue().toString().padStart(2,"0");
    const minute=this.minuteValue().toString().padStart(2,"0");
    const seconds=this.secondValue().toString().padStart(2,"0");
    return `${hour}:${minute}:${seconds}`;
  }

  submitQuiz() {
    this.finalScore = 0;
    this.questions.forEach((q, index) => {
      if (this.studentAnswers[index] === q.correctAnswer) {
        this.finalScore++;
      }
    });
    this.quizSubmitted = true;
  }

}
