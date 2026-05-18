import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.html',
  styleUrls: ['./ai-assistant.css']
})
export class AiAssistantComponent {
  newMessage: string = '';
  
  // Initial chat data
  chats = [
    { sender: 'Bot', text: 'Hello Student! I am your EduFlow AI. How can I help you with your training today?', time: '10:00 AM' }
  ];

  sendMessage() {
    if (!this.newMessage.trim()) return;

    // Push user message
    const userMsg = { 
      sender: 'You', 
      text: this.newMessage, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    this.chats.push(userMsg);
    
    const contextReq = this.newMessage.toLowerCase();
    this.newMessage = '';

    // Simulate AI "Thinking" and responding
    setTimeout(() => {
      let botResponse = "That's an interesting question! Let me look into that for you.";
      
      if (contextReq.includes('angular')) {
        botResponse = "Angular is a powerful framework! Are you working on Pipes or Routing right now?";
      } else if (contextReq.includes('deadline')) {
        botResponse = "Your technical training phase is scheduled to finish on May 27, 2026.";
      }

      this.chats.push({
        sender: 'Bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 1000);
  }
}