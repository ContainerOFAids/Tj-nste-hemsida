import { Prisma, PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { userInfo } from 'os';

const prisma = new PrismaClient();

export const load = (async () => {
    
    return {};
}) satisfies PageServerLoad;