import { fail, redirect } from '@sveltejs/kit';
import {PrismaClient} from "@prisma/client"
import type { Actions, PageServerLoad } from './$types';

import crypto from 'crypto';

const prisma = new PrismaClient();

export const load = (async ({cookies}) => {
    let username = cookies.get("username");
    if(username){
        throw redirect(303, "/")
    }
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({request, cookies}) => {
        let data = await request.formData();
        let username = data.get("username")?.toString();
        let password = data.get("password")?.toString();
        if(username){
            const existingUser = await prisma.user.findUnique({
                where: {name: username}
            });
            if(!password){
                return fail(400, {userName: "no password found :("})
            }
            if(existingUser) {  
                //when the user exists :)

                let passMatch = validatePassword(password, existingUser.salt, existingUser.password);

                if(passMatch){
                    const token = await prisma.token.create({
                        data: { userId: existingUser.id },
                    });
                    cookies.set("username", token.id, { secure: false, path: "/" });
                    throw redirect(307, "/");
                }
                else{
                    return fail(400, {userName: "Wrong password."})
                }                
            }
            else {
                return fail(400, {userName: "User does not exist"})
            }

        }
        else{
            return fail(400, {userName: "No username???"})
        }
    },
    logout: async ({ cookies }) => {
        let userName = cookies.get("username");
        if(!userName){
            return fail(400, {userName: "No username to be found :("})
        } 
        cookies.delete("username", {path: "/"})          
        let token = cookies.get("username");
        if (!token) {
            throw redirect(307, "/login"); // login
        }
        cookies.delete("username", {path: "/"});
        await prisma.token.delete({ where: { id: token } });
    }
};
function validatePassword(inputPassword : crypto.BinaryLike, storedSalt : crypto.BinaryLike, storedHash : string) {
    const hash = crypto.pbkdf2Sync(inputPassword, storedSalt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
}