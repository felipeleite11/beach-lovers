import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from '@/lib/prisma'
import { generateSlug } from "@/utils/string"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'sqlite'
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false
    },
    databaseHooks: {
        user: {
            create: {
                after: async user => {
                    await prisma.person.create({
                        data: {
                            name: user.name,
                            slug: generateSlug(user.name),
                            userId: user.id
                        }
                    })
                }
            }
        }
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }
    }
})