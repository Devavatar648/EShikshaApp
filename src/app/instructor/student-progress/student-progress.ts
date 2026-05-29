import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CourseService } from '../../services/course-service';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-student-progress',
  imports: [CommonModule],
  templateUrl: './student-progress.html',
  styleUrl: './student-progress.css',
})
export class StudentProgress {
  private courseService = inject(CourseService);
  private loadinService = inject(LoadingService);
  private toastService = inject(ToastrService);
  
  instructorCourses = signal<{ id: string, title: string, category:string }[]>([]);
  studentsProgressData = signal<any|null>(null);

  ngOnInit(){
    this.courseService.instructorCoursesList$
    .subscribe(courses => {
      if (courses) {
        this.instructorCourses.set(courses)
      }
    })
  }


  onCourseChange(event:any){
    this.loadinService.isLoading$.next(true);
    this.courseService.getStudentsCourseReport(event.target.value)
    .pipe(
      finalize(()=>this.loadinService.isLoading$.next(false))
    )
    .subscribe({
      next:res=>{
        this.studentsProgressData.set(res.result);
        console.log(res.result);
      },
      error:_=>{
        this.toastService.error("Error while loading student progress.")
      }
    })
  }

  getAverageCourseComplitionRate():string{
    if(this.studentsProgressData()?.students?.length===0)return "0.00";
    return ((this.studentsProgressData()?.students?.map((s:any)=>s.completedModule)?.reduce((a:number,b:number)=>a+b,0)/(this.studentsProgressData()?.totalModules*this.studentsProgressData()?.students?.length))*100).toFixed(2);
  }

  getRiskStudentCount(){
    if(this.studentsProgressData()?.students?.length===0 || this.studentsProgressData()?.totalModules===0)return 0;
    return this.studentsProgressData()?.students?.filter((s:any)=>{
      console.log(s.completedModule/this.studentsProgressData()?.totalModules)
      if((s.completedModule/this.studentsProgressData()?.totalModules)<0.1)return s;
    }).length;
  }
}
