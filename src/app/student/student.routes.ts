import { Routes } from "@angular/router";

export const studentRoutes : Routes = [
    {path:"", loadComponent:()=>import("./student-page/student-page").then(r=>r.StudentPage), children:[
        {path:"", redirectTo:"student", pathMatch:"full"},
        {path:"student", loadComponent:()=>import("./studashboard/studashboard").then(r=>r.Studashboard)},
        {path:"coursecatalog", loadComponent:()=>import("../components/course-catalog/course-catalog").then(r=>r.CourseCatalog)},
        {path:"coursecatalog/coursedetails/:courseId", loadComponent:()=>import("../components/course-details/course-details").then(r=>r.CourseDetails)},
        {path:"coursecatalog/coursedetails/:courseId/assignment/:id",loadComponent:()=>import("../student/student-assignment/student-assignment").then(r=>r.StudentAssignment)},
        {path:"settings", loadComponent:()=>import("../components/settings/settings").then(r=>r.Settings)},
        {path:"enrolledcourses", loadComponent:()=>import("./enrolled-courses/enrolled-courses").then(r=>r.EnrolledCourses)},
        {path:"enrolledcourses/result", loadComponent:()=>import("./result/result").then(r=>r.Result)},
        {path:"enrolledcourses/coursedetails/:courseId", loadComponent:()=>import("../components/course-details/course-details").then(r=>r.CourseDetails)}
    ]}
]