import { prisma } from '../lib/prisma';

export async function getFavourites(userId: string) {
    return await prisma.savedPost.findMany({ where: { user_id: userId } });
}

export async function updateCredits(userId: string, credits: number) {
    return await prisma.user.update({
        where: { id: userId },
        data: { credits: credits },
    })
}

export async function getUserFavourites(userId: string) {
    return await prisma.savedPost.findMany({ where: { user_id: userId } });
}

export async function getUsers() {
    return await prisma.user.findMany();    
}