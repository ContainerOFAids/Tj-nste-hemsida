import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { _findCurrentUser } from '../../+layout.server';

const prisma = new PrismaClient();

export const load = (async ({cookies}) => {
    let username = cookies.get("username");
    const user = await _findCurrentUser(cookies.get("username") ?? "");
    const activities = await prisma.activity.findMany({ where: {isApproved: true, canapply: true}, include: {likes: true}});
    const displayInfo = activities.map((activity) => {
        return {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            liked: activity.likes.some((like) => like.id === user.id),
            likeCount: activity.likes.length
        }
    });
    
    const existingUser = await prisma.user.findUnique({
        where: {id: user.id}
    });

    return {activities: displayInfo, existingUser};
}) satisfies PageServerLoad;