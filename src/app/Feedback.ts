export class feedbacks { 

    id!: number; 

    email!: string; 

    registration_date!: string; 

    payment_status!: string; 

    confirm!: boolean; 

    dispute!: string; 

    feedback!: string; 

    rating!: string; 

    event_id!: number; 

    userId!: number; 

  

    constructor( 

      email: string, 

      registration_date: string, 

      payment_status: string, 

      confirm: boolean, 

      dispute: string, 

      feedback: string, 

      rating : string, 

      event_id: number, 

      userId: number, 

    ) { 

      this.email = email; 

      this.registration_date = registration_date; 

      this.payment_status = payment_status; 

      this.confirm = confirm; 

      this.dispute = dispute; 

      this.feedback = feedback; 

      this.rating = rating; 

      this.event_id = event_id; 

      this.userId = userId; 

    } 

  } 