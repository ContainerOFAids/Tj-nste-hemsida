import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const load = (async ({ cookies }) => {
    //username cookie is the token :()
    let token = cookies.get("username");
    if(!token){
        
        throw redirect(303, "/login")
    }

    let prismaToken = await prisma.token.findUnique({
        where: {id: token},
        include: {user: {select: {name: true, id: true}}}
    })

    if(!prismaToken){
        cookies.delete("username", {path: "/"});
        throw redirect(303, "/login");
    }

    const expireDays = 7
    //Kolla om kakan har expirat
    if(Date.now() - prismaToken.createdAt.getTime() > expireDays * 1000 * 3600 * 24){
        cookies.delete("username", {path: "/"})
        await prisma.token.delete({where: {id: token}});
        throw redirect(303, "/login")
    }
    return { user: prismaToken.user };
}) satisfies LayoutServerLoad;