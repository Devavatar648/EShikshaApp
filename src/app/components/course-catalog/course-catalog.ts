import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseCard } from '../course-card/course-card';
import { CourseService } from '../../services/course-service';
import { Course } from '../../models/course';
import { LoadingService } from '../../services/loading-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-catalog',
  imports: [RouterModule, CourseCard, FormsModule],
  templateUrl: './course-catalog.html',
  styleUrl: './course-catalog.css',
})
export class CourseCatalog {
  private courseService = inject(CourseService);
  private loadingService = inject(LoadingService);


  courseList = signal<Course[]>([]);
  searchQuery = signal('');

  ngOnInit(){
    this.loadingService.isLoading$.next(true);
    this.courseService.catalogCourses$.subscribe(res=>{
      if(res.length!==0)this.courseList.set(res);
      else {
        this.courseService.getAllCourses().subscribe(res=>{
          this.courseList.set(res.result);
          this.courseService.catalogCourses$.next(res.result);
        })
      }
      this.loadingService.isLoading$.next(false);
    })
    
  }

  filteredCourses = computed(() => {
    const term = this.searchQuery().toLowerCase().trim();
    const allCourses = this.courseList();

    if (!term) return allCourses;

    return allCourses.filter(course => 
      course.title.toLowerCase().includes(term) || 
      course.category.toLowerCase().includes(term)
    );
  });
}
