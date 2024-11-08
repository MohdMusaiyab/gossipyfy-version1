"use server"
import { getSessionOrThrow } from "../../../lib/getSession"
import prisma from "../../../lib/prisma"

export const getPremiumStatus = async () => {
    const session = await getSessionOrThrow()
    const user = await prisma.user.findUnique({
        where: {
        email: session.user.email,
        },
    })
    
    return user?.isPremium || false
}