import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-admin-page',
  imports: [Sidebar],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {
  navElements = ["Dashboard", "Manage Users", "Course Catalog", "Settings"];
}
