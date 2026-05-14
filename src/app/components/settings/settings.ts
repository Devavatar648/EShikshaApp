import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  private userService = inject(UserService);
  private toastService = inject(ToastrService);

  activeUser!:User;
  updatedData = {
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  }

  ngOnInit(){
    this.userService.activeUser$.subscribe(res=>{
      this.activeUser=res as User;
      this.updatedData.name=this.activeUser.name;
      this.updatedData.email=this.activeUser.email;
    })
  }

  updateProfile(){
    if(this.updatedData.email!==this.activeUser.email && this.updatedData.password){
      this.toastService.error("Email and Password can't be updated at the same time");
      return;
    }
    if(this.updatedData.password!==this.updatedData.confirmPassword){
      this.toastService.error("Password and Confirm password must be same");
      return;
    }
    this.userService.updateUserSettings(this.updatedData).subscribe({
      next:res=>{
        this.toastService.success(res.message);
      },
      error:err=>{
        this.toastService.error(err.error.message||"Settings updation failed");
      }
    })
  }
}
