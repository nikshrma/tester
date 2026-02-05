import CredentialsProvider from "next-auth/providers/credentials"
import DiscordProvider from "next-auth/providers/discord";
import prisma from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const NEXT_AUTH = {
    adapter:PrismaAdapter(prisma),
    session: { strategy: 'jwt' }, 
    providers: [
        CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text', placeholder: 'nikshrma2006@gmail.com' },
            password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials :UserCredentials | undefined, req ) {
            if(!credentials)return null;
            const {email , password} = credentials;
            const user = await prisma.user.findFirst({
                where: {
                    email,
                    password
                }
            });
            if (!user) return null;
            const toReturn = {
                id:user.id,
                email:user.email
            }
            return toReturn;
        }
    }),
    DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string
  })
],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt : async({token,user}:any)=>{
            if(user){
                token.id = user.id;
            }
            return token;
        },
        session: ({session ,token ,user}:any)=>{
            if(session && session.user){
                session.user.id = token.id;
            }
            return session;
        }
    }
}

type UserCredentials ={
    password:string,
    email:string
}