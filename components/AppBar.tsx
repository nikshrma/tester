"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export const AppBar = () => {
    const session = useSession();
    
    const router = useRouter();
    return <div>
        <button onClick={() => { router.push('/signup') }}>
            Sign up pooh
        </button>
        <button onClick={() => { signIn() }}>
            Sign in pooh
        </button>
        <button onClick={() => { signOut() }}>
            Sign out pooh
        </button>
        <div>
            {JSON.stringify(session)};
        </div>
        <img src={session.data?.user?.image} ></img>
    </div>
}