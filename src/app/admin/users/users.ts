import { Component, inject, signal } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  private userService = inject(UserService);

  users = signal<User[]>([]);
  selectedRole!:string;
  searchText = new FormControl('');

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

  editUser(id:string){
    console.log("Editing user : ",id);
  }

  deleteUser(id:string){
    console.log("Deleting user : ",id);
  }
}
