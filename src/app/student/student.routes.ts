import { Routes } from "@angular/router";

export const studentRoutes : Routes = [
    {path:"", loadComponent:()=>import("./student-page/student-page").then(r=>r.StudentPage), children:[
        {path:"", redirectTo:"student", pathMatch:"full"},
        {path:"student", loadComponent:()=>import("./studashboard/studashboard").then(r=>r.Studashboard)},
        {path:"coursecatalog", loadComponent:()=>import("../components/course-catalog/course-catalog").then(r=>r.CourseCatalog)},
        {path:"settings", loadComponent:()=>import("../components/settings/settings").then(r=>r.Settings)},
        {path:"enrolledcourses", loadComponent:()=>import("./enrolled-courses/enrolled-courses").then(r=>r.EnrolledCourses)},
        {path:"enrolledcourses/result", loadComponent:()=>import("./result/result").then(r=>r.Result)},
        {path:"enrolledcourses/course", loadComponent:()=>import("./course-content/course-content").then(r=>r.CourseContent)}
    ]}
]