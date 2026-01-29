import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/middleware";

async function seedAdmin(){
    try {
  

        const adminData ={
            name :'arafat',
            email:'arafatmr42@gmail.com',
            password :'araf123456',
    role : UserRole.ADMIN
        }
        const existingUser= await prisma.user.findUnique({
            where :{
                email : adminData.email
            }
        })
        
        if (existingUser){
            throw new Error('Already exists')
        }

        const signUpAdmin= await fetch("http://localhost:3000/api/auth/sign-up/email",{
            method :"POST",
            headers :{
                "content-type":"application/json",
                origin:"http://localhost:4000"
            },
            body :JSON.stringify(adminData)
        })

        console.log(signUpAdmin);
        
    } catch (error) {
        console.log(error);
        
    }
}

seedAdmin()