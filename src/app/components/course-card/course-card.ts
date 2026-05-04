import { Component, input } from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  course = input<Course>();
}
