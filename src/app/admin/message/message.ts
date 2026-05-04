import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message',
  imports: [CommonModule, FormsModule],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message {
  activeTab: string = 'messaging'; 
  newMessage: string = '';

  
forumPosts = [
  { 
    author: 'Rahul Sharma', 
    topic: 'How to handle RxJS memory leaks?', 
    content: 'I am struggling with subscriptions in my Angular project. Any tips?', 
    replies: 3, 
    date: '24 Apr' 
  },
  { 
    author: 'Admin', 
    topic: 'Project Submission Guidelines', 
    content: 'Please ensure all projects are pushed to the main branch before Monday.', 
    replies: 10, 
    date: '23 Apr' 
  }
];

newTopicTitle: string = '';
newTopicContent: string = '';

postToForum() {
  if (this.newTopicTitle.trim() && this.newTopicContent.trim()) {
    this.forumPosts.unshift({
      author: 'You',
      topic: this.newTopicTitle,
      content: this.newTopicContent,
      replies: 0,
      date: 'Today'
    });
    // Reset fields
    this.newTopicTitle = '';
    this.newTopicContent = '';
  }
}

  notifications = [
    { title: 'New Assignment', body: 'Angular Routing Quiz is live.', time: 'Just now', type: 'info' },
    { title: 'System Update', body: 'Server maintenance at 12 AM.', time: '2h ago', type: 'warning' }
  ];

  chats = [
    { sender: 'Instructor', text: 'Hello! How can I help you today?', time: '10:00 AM' },
    { sender: 'You', text: 'I have a doubt regarding the Communication Module UI.', time: '10:05 AM' }
  ];

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chats.push({
        sender: 'You',
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.newMessage = '';
    }
  }
}
