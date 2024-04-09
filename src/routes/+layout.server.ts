import { PrismaClient } from '@prisma/client';
import type { LayoutServerLoad } from './$types';

const prisma = new PrismaClient();

export const load = (async () => {
    const token = await prisma.token.findMany({});
    // let profilpic = await prisma.user.findUnique ({
    //     where: {
    //         pic: token.id
    //     }
    // })
    let user = await prisma.user.findMany({})
    return {token,user};
}) satisfies LayoutServerLoad;