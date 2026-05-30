import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  private userService = inject(UserService);
  private toastService = inject(ToastrService);
  private formBuilder = inject(FormBuilder);

  activeUser!: User;
  settingsForm = this.formBuilder.group({
    name: ['', []],
    email: ['', []],
  })

  ngOnInit() {
    this.userService.activeUser$.subscribe(res => {
      this.activeUser = res as User;
      this.settingsForm.get('name')?.setValue(this.activeUser.name);
      this.settingsForm.get('email')?.setValue(this.activeUser.email);
    })
  }

  updateProfile() {
    if (!this.settingsForm.valid || !this.settingsForm.dirty) {
      this.toastService.info("No Changes")
      return
    };

    const { name, email } = this.settingsForm.value;

    let updatedData: { name?: string, email?: string } = {};

    if (name && this.activeUser.name !== name) {
      updatedData['name'] = name;
    }
    if (email && this.activeUser.email !== email) {
      updatedData['email'] = email;
    }
    if(confirm("Do you want to change ?")){
       this.userService.updateUserSettings(updatedData).subscribe({
      next: res => {
        this.toastService.success(res.message);
      },
      error: err => {
        this.toastService.error(err.error.message || "Settings updation failed");
      }
    })
    }
  }

  get password() {
    return this.settingsForm.get('password');
  }

  get confirmPassword() {
    return this.settingsForm.get('confirmPassword');
  }
}
