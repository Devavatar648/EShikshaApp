import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { UserService } from '../../services/user-service';
import { Course } from '../../models/course';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-insdashboard',
  imports: [BaseChartDirective],
  templateUrl: './insdashboard.html',
  styleUrl: './insdashboard.css',
})
export class Insdashboard {

  private courseService = inject(CourseService);
  private userService = inject(UserService);

 lovedCourses = signal([
    { _id: '1', title: 'Mastering Node.js API', rating: 4.9, enrolled: 450, loveScore: 98 },
    { _id: '2', title: 'Advanced CSS Animations', rating: 4.8, enrolled: 320, loveScore: 92 },
    { _id: '3', title: 'Database Optimization', rating: 4.7, enrolled: 210, loveScore: 85 }
  ]);

  // Chart Configuration
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'New Students',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        borderColor: '#0d6efd',
        pointBackgroundColor: '#0d6efd',
        pointBorderColor: '#fff',
        fill: 'origin',
        tension: 0.4 // Makes the line smooth
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { display: false }, // Hide Y axis for a cleaner minimal look
      x: { grid: { display: false } }
    }
  };

}
