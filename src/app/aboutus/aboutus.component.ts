// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-aboutus',
//   standalone: false,
//   templateUrl: './aboutus.component.html',
//   styleUrl: './aboutus.component.css'
// })
// export class AboutusComponent {

// }
import { Component } from '@angular/core'; 

 

@Component({ 

  selector: 'app-aboutus', 

  standalone: false, 

  templateUrl: './aboutus.component.html', 

  styleUrl: './aboutus.component.css' 

}) 

export class AboutusComponent { 

  isModalOpen = false; 

      isChatActive = false; 

      name: string = ''; 

      email: string = ''; 

      message: string = ''; 

      chatMessage: string = ''; 

    

      // Function to open the modal and add the smooth transition class 

      openModal() { 

        this.isModalOpen = true; 

        setTimeout(() => { 

          const overlay = document.querySelector('.chat-modal-overlay'); 

          const modal = document.querySelector('.chat-modal'); 

          overlay?.classList.add('show'); 

          modal?.classList.add('show'); 

        }, 10); // Small delay to ensure the modal has rendered before adding class 

      } 

    

      // Function to close the modal 

      closeModal() { 

        this.isModalOpen = false; 

        const overlay = document.querySelector('.chat-modal-overlay'); 

        const modal = document.querySelector('.chat-modal'); 

        overlay?.classList.remove('show'); 

        modal?.classList.remove('show'); 

      } 

    

      // Start chatting: Switch to the active chat view 

      startChat() { 

        if (this.name && this.email && this.message) { 

          console.log('Form submitted:', { name: this.name, email: this.email, message: this.message }); 

          this.isChatActive = true;  // Activate chat view 

        } else { 

          alert('Please fill in all the required fields!'); 

        } 

      } 

    

      // Handle sending a chat message 

      sendChatMessage() { 

        if (this.chatMessage) { 

          console.log('User message:', this.chatMessage); 

          this.chatMessage = ''; // Clear chat input after sending the message 

          this.isChatActive = false; // Disable the chat view 

          this.closeModal(); // Close the modal after sending the message 

        } 

      } 

      

  

} 