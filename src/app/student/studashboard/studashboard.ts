import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-studashboard',
  imports: [],
  templateUrl: './studashboard.html',
  styleUrl: './studashboard.css',
})
export class Studashboard {
  studentCourses = signal([
  { 
    _id: 'c1', 
    title: 'Advanced Web Development', 
    isCompleted: true, 
    quizCount: 10,
    quizzesAttended: 10,
    // (Attended / Total) * 100
    progress: 100 
  },
  { 
    _id: 'c2', 
    title: 'Database Systems', 
    isCompleted: false, 
    quizCount: 8,
    quizzesAttended: 4,
    progress: 50 
  },
  { 
    _id: 'c3', 
    title: 'UI/UX Design', 
    isCompleted: false, 
    quizCount: 5,
    quizzesAttended: 1,
    progress: 20 
  }
]);

  // 2. Raw data from your Quiz History
  recentQuizzes = signal([
    { courseName: 'Web Development', score: 95, date: '2026-05-01' },
    { courseName: 'Web Development', score: 82, date: '2026-04-28' },
    { courseName: 'Database Design', score: 70, date: '2026-05-05' }
  ]);

  // 3. Computed stats (No complex DB queries needed!)
  enrolledCount = computed(() => this.studentCourses().length);
  completedCount = computed(() => this.studentCourses().filter(c => c.isCompleted).length);
  
  completionRate = computed(() => {
    return Math.round((this.completedCount() / this.enrolledCount()) * 100);
  });

  totalQuizzes = computed(() => this.recentQuizzes().length);
  averageQuizScore = computed(() => {
    const scores = this.recentQuizzes().map(q => q.score);
    return scores.length ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0;
  });
}
