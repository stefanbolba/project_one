"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const auth = useAuth();

  const { mutate: loginMutation, isLoading: isLoggingIn } = useMutation(
    () =>
      axios.post(`${process.env.FUNCTIONS}/auth-login`, {
        email,
        password,
        applicationKey: process.env.APPLICATION_KEY,
      }),
    {
      onSuccess: ({ data }) => {
        if (data) {
          auth.login(data.accessToken, data.refreshToken);
          router.back();
        }
      },
    }
  );

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <button onClick={loginMutation}>Log In</button>
    </div>
  );
};

export default Login;
