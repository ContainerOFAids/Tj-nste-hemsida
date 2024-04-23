import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {PrismaClient} from "@prisma/client";
import { _findCurrentUser } from '../../../+layout.server';
const prisma = new PrismaClient();

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    suggest: async({request, cookies}) => {
        let data = await request.formData();
        let name = data.get('name')?.toString();
        let description = data.get('desc')?.toString();
        

        if(!name || !description) {
            return fail(300, {message: "Missing required fields"});
        }
        const token = cookies.get('username');
        if(!token) {
            return fail(401, {message: "Unauthorized"});
        }
        const user = await _findCurrentUser(token);
        if(user.id === "") {
            return fail(401, {message: "Unauthorized"});
        }
        let activity = await prisma.activity.create({
            data: {
                name: name,
                description: description,
                suggestedById: user.id,
                canapply: false,
                adminlikes: 0
            }
        });
        if(activity) {
            console.debug("created")
        }
    }
};