import { PrismaClient } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

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

    const activities = await prisma.activity.findMany({ where: {suggestedBy: user, suggestedById: user.id}});
    const application = await prisma.application.findMany({ where: {createdby: user}});
    
    
    return {isAdmin: admin, user, activities, application};
}) satisfies PageServerLoad;

export const actions: Actions = {
    Save: async ({params, request, cookies}) => {
        let formData = await request.formData();
        const description = formData.get('desc')?.toString();
        let username = cookies.get("username") ?? "";
        let token = await prisma.token.findUnique({
            where: {
                id: username
            }
        })
        try {
            await prisma.user.update({
                where: {
                    id: token?.userId
                },

                data: {
                    desc: description
                }
            });
        } catch (error) {
            // Handle the error here
        }
    }
};