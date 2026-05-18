import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './announcements.html',
  styleUrls: ['./announcements.css']
})
export class Announcements implements OnInit {
  private http = inject(HttpClient);

  notifications = signal<any[]>([]);
  private apiUrl = 'http://localhost:3000/api/announcements';

  newAnnouncementText = ''; 
  isInstructor = false; // Start as false to ensure student view by default

  ngOnInit() {
    this.loadAnnouncements();
    this.checkUserRole(); 
  }

  // announcements.ts
checkUserRole() {
  const data = localStorage.getItem('user');
  if (data) {
    const parsedData = JSON.parse(data);
    
    
    const userRole = parsedData.user?.role;

    console.log("SHAHIN - Extracted Role:", userRole);

    // This matches the 'INSTRUCTOR' string seen in your console
    this.isInstructor = (userRole === 'INSTRUCTOR');
    
    console.log("SHAHIN - Access Granted:", this.isInstructor);
  }
}

  loadAnnouncements() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.notifications.set(data),
      error: (err) => console.error('Could not load announcements', err)
    });
  }

  postAnnouncement() {
    if (!this.newAnnouncementText.trim()) return;

    const data = localStorage.getItem('user');
    const parsedData = data ? JSON.parse(data) : {};
    
   
    const payload = {
      content: this.newAnnouncementText,
      instructorName: parsedData.user?.name || 'Instructor' 
    };

    this.http.post(this.apiUrl, payload).subscribe({
      next: () => {
        this.newAnnouncementText = ''; 
        this.loadAnnouncements(); 
      },
      error: (err) => console.error('Failed to post announcement', err)
    });
  }
}
