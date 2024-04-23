import type { PageServerLoad } from './$types';
import {PrismaClient} from "@prisma/client";
import { _findCurrentUser } from '../../+layout.server';
import { error, type Actions } from '@sveltejs/kit';
import { PassThrough } from 'stream';
import { disableScrollHandling } from '$app/navigation';
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'net';
const prisma = new PrismaClient();


export const load = (async ({cookies}) => {
    let username = cookies.get("username");
    const user = await _findCurrentUser(cookies.get("username") ?? "");
    const activities = await prisma.activity.findMany({ where: {isApproved: true, canapply: false}, include: {likes: true}});
    const displayInfo = activities.map((activity) => {
        return {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            liked: activity.likes.some((like) => like.id === user.id),
            likeCount: activity.likes.length,
            adminlikes: activity.adminlikes
        }
    });
    
    const existingUser = await prisma.user.findUnique({
        where: {id: user.id}
    });
    
    

    return {activities: displayInfo, existingUser };
}) satisfies PageServerLoad;

export const actions: Actions = {
    like: async ({request, cookies}) => {
        const formData = await request.formData();
        const activityId = formData.get('activityId')?.toString();
        const user = await _findCurrentUser(cookies.get("username") ?? "");
        try {
            // Find if a user has liked a post
            const pUser = await prisma.user.findUnique({
                where: { id: user.id },
                include: { likes: true },
            });
            if(!pUser) throw error(400, "User not found")
            
            const hasLikedPost = pUser.likes.some((post) => post.id === activityId);
            
            // Update the like status of a post
            if (hasLikedPost) {
                await prisma.user.update({
                where: { id: user.id },
                data: { likes: { disconnect: { id: activityId } } },
                });
            } else {
                await prisma.user.update({
                where: { id: user.id },
                data: { likes: { connect: { id: activityId } } },
                });
            }
        } catch (e) {
            throw error(400, "Something went wrong...")
        }
        
        const activities = await prisma.activity.findMany({ where: {isApproved: true}, include: {likes: true}});
        const displayInfo = activities.map((activity) => {
            return {
                id: activity.id,
                name: activity.name,
                description: activity.description,
                liked: activity.likes.some((like) => like.id === user.id),
                likeCount: activity.likes.length
            }
        });

        return {activities: displayInfo};
    },


    likeup: async ({request, cookies}) => {
        let data = await request.formData();
        let id = data.get('id')?.toString();
        
        
        
        try {
            await prisma.activity.update({
                where: {id: id},
                data: {
                    adminlikes: { increment: 1 }
                }
            });
        } catch (error) {
            // Handle the error here
        }
        
        PassThrough
    },
    add: async ({request, cookies}) => {
        let data = await request.formData();
        let activityid = data.get('id')?.toString();
    
    
        try {
            await prisma.activity.update({
                where: {id: activityid},
                data: {canapply: true}
            });
        } catch (error) {
            // Handle the error here
        }
    },
        likedown: async ({request, cookies}) => {
        let data = await request.formData();
        let id = data.get('id')?.toString();
        
        
        
        try {
            await prisma.activity.update({
                where: {id: id},
                data: {
                    adminlikes: { decrement: 1 }
                }
            });
        } catch (error) {
            // Handle the error here
        }
        
        
    },
    canapply: async ({request, cookies}) => {
        let data = await request.formData();
        let id = data.get('id')?.toString();
        
        
        
        try {
            await prisma.activity.update({
                where: {id: id},
                data: {
                    canapply: true
                }
            });
        } catch (error) {
            // Handle the error here
        }
        
        
    }
    
};

