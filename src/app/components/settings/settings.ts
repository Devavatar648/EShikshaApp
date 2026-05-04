import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  userService = inject(UserService);
  activeUser!:User;

  ngOnInit(){
    this.userService.activeUser$.subscribe(res=>{
      this.activeUser=res as User;
    })
  }
}
