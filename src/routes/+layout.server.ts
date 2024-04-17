import {PrismaClient} from "@prisma/client";
import type { LayoutServerLoad } from "./$types";
const prisma = new PrismaClient();

export const load = (async ({cookies}) => {
    let token = cookies.get("username") ?? "";
    let prismaToken = await prisma.token.findUnique({
        where: { id: token },
        include: { user: true }
    });
    
    if(!prismaToken) return {isAdmin: false}
    let user = prismaToken.user;
    let admin = user.isAdmin

    
    
    return {isAdmin: admin, user};
}) satisfies LayoutServerLoad;

export const _findCurrentUser = async (token : string) => {
    let prismaToken = await prisma.token.findUnique({
    where: { id: token },
    include: { user: { select: { name: true, id: true } } }
});
if(!prismaToken) return {id: "", name: ""};

return prismaToken.user;
};