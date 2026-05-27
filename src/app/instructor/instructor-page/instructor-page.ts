import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-instructor-page',
  imports: [Sidebar],
  templateUrl: './instructor-page.html',
  styleUrl: './instructor-page.css',
})
export class InstructorPage {
  navElements = ["Dashboard", "Manage Course", "Quizes", "Assignments", "Student Progress", "Announcements","Chat-Box", "Settings"];
}
