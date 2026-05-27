import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-student-page',
  imports: [Sidebar],
  templateUrl: './student-page.html',
  styleUrl: './student-page.css',
})
export class StudentPage {
  navElements = ["Dashboard", "Course Catalog", "Enrolled Courses", "Announcement", "Chat-Box", "Settings"];
}
