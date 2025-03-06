export class Event{ 

    id!:number 

    title!:String 

    description!:String 

    type!:String 

    date!:String 

    location!:String 

    price!:number 

    status!:String 

    organizer_id!:number 

    created_at!:String 

    updated_at!:String 

    image!:String 

    constructor( id:number,title:String, description:String,type:String,date:String,location:String,price:number,status:String,organizer_id:number,created_at:String,updated_at:String, image:String){ 

        this.id=id; 

        this.title=title; 

        this.description=description; 

        this.type=type; 

        this.date=date; 

        this.location=location; 

        this.price=price; 

        this.status=status; 

        this.organizer_id=organizer_id; 

        this.created_at=created_at; 

        this.updated_at=updated_at; 

        this.image=image; 

    } 

 

} 