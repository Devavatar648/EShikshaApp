import { Component, inject, signal } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  private userService = inject(UserService);
  private toastService = inject(ToastrService);

  users = signal<User[]>([]);
  selectedRole!:string;
  searchText = new FormControl('');
  setEditUser = signal<string>('');
  userValueForEdit = {
    email: "",
    name: ""
  }

  ngOnInit(){
    this.getTableData('ALL');
    this.searchText.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value=>{
        return this.userService.getUsers(this.selectedRole||"ALL", value||'')
      })
    ).subscribe(res=>{
      this.users.set(res.result);
    })
  }

  filterUser(){
    this.getTableData(this.selectedRole, this.searchText.value??'');
  }

  getTableData = (role:string,searchVal?:string)=>{
    this.userService.getUsers(role,searchVal).subscribe(res=>{
      this.users.set(res.result)
    });
  }

  getAvtarUrl(name:string, role:string):string{
    const formattedName = name.split(" ").join("+");
    return `https://ui-avatars.com/api/?name=${formattedName}&${role==="STUDENT"?"background=E6FAFF&color=0DCAF0":"background=E8F1FF&color=0D6EFD"}`;
  }

  editUser(user:User, ind:number){
    if(this.setEditUser() && user._id){
      this.userService.updateUser(user._id, this.userValueForEdit).subscribe({
        next:res=>{
          this.updateUserTableData(user, 'update', ind);
          this.toastService.success(res.message);
          this.setEditUser.set('');
        },
        error:err=>{
          console.log(err);
          this.toastService.error(err.error?.message??"Internal server Error");
        }
      })
    }else{
      this.userValueForEdit.email=user.email;
      this.userValueForEdit.name=user.name;
      this.setEditUser.set(user._id??"");
    }
  }

  deleteUser(user:User){
    if(user._id){
      this.userService.deleteUser(user._id).subscribe({
        next:res=>{
          this.updateUserTableData(user, 'delete');
          this.toastService.success(res.message);
        },
        error:err=>{
          console.log(err);
          this.toastService.error(err.error?.message??"Internal server Error");
        }
      })
    }
  }

  updateUserTableData = (user:User, action:'update'|'delete', ind?:number)=>{
    if(action==='delete'){
      this.users.set(this.users().filter(u=>u._id!==user._id));
    }else if(action==='update' && ind){
      const updatedUser = {...user,...this.userValueForEdit};
      this.users.update(users=>users.map(u=>{
        if(u._id===user._id)return updatedUser;
        return u;
      }));
    }
  }
}
