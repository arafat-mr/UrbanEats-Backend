import { prisma } from "../../lib/prisma"


const getCurrentUser=async(userId:string)=>{
  return  await prisma.user.findUnique({
        where:{
id :userId
        }
    })
}

const updateCurrentUser = async (
  id: string,
  payload: {
    name?: string;
    phone?: string;
    image?: string;
  }
) => {
  return prisma.user.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      image: true,
    },
  });
};
export const AuthService={
    getCurrentUser,updateCurrentUser
}