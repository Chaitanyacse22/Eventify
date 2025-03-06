export class Admin{ 

    id! : number; 

    name! : string; 

    email! : string; 

    password! : string; 

    role! : string; 

    status! : string; 

    constructor(id:number, name:string, email:string, password:string, role:string, status:string){ 

        this.id = id; 

        this.name = name; 

        this.email = email; 

        this.password = password; 

        this.role = role; 

        this.status = status; 

    } 

     

} 