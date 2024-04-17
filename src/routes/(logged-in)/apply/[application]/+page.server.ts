import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {PrismaClient} from "@prisma/client";
import { _findCurrentUser } from '../../../+layout.server';
import { request } from 'http';

const prisma = new PrismaClient();

export const load = (async ({params, cookies}) => {
    let username = cookies.get("username");
    const user = await _findCurrentUser(cookies.get("username") ?? "");
    const activities = await prisma.activity.findUnique({
        where: {
            id: params.application
        }
    })
    
    
    const existingUser = await prisma.user.findUnique({
        where: {id: user.id}
    });

    return {activities, existingUser};
}) satisfies PageServerLoad;

export const actions: Actions = {
    apply: async({request, cookies}) => {
        let data = await request.formData();
        let telefonnummer = data.get('tele')?.toString();
        let epost = data.get('epost')?.toString();
        let tid = data.get('tid')?.toString();
        let information = data.get('info')?.toString();

        const token = cookies.get('username');
        if(!token) {
            return fail(401, {message: "Unauthorized"});
        }
        const user = await _findCurrentUser(token);
        if(user.id === "") {
            return fail(401, {message: "Unauthorized"});
        }
        if(!telefonnummer || !epost || !tid || !information) {
            return fail(300, {message: "Missing required fields"});
        }
        

        let application = await prisma.application.create({
            data: {
                createdbyid: user.id,
                telefonnummer: telefonnummer,
                epost: epost,
                tid: new Date(tid),
                information: information
            }
        });
    },
    
};

