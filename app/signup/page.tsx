"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignUpPage(){
    const [email , changeEmail] = useState("");
    const [password , changePassword] = useState("");

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
       await axios.post("/api/auth/signup",{
        email,
        password
       });
       await signIn("credentials" , {
        email,
        password,
        redirect:true,
        callbackUrl:'/'
       })
    }
    return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => changeEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => changePassword(e.target.value)}
      />

      <button type="submit">Sign up</button>
      <button onClick={()=>{
        signIn("discord", {
            redirect:true,
            callbackUrl:'/'
        });
      }}>Discord</button>
    </form>
  );
}