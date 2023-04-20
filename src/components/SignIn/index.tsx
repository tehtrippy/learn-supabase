import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { useRouter } from "next/router";
import { BeakerIcon } from "@heroicons/react/24/solid";
import { signin } from "../../helpers/supabase";
import SignUp from "../SignUp";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await signin({ email, password });
      if (error) {
        return toast.error("Authentication Failed!");
      }
      toast.success("Authentication Successfully!", {
        onOpen: () => {
          setTimeout(() => {
            router.reload();
          }, 1000);
        },
      });
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return showSignUp ? (
    <SignUp />
  ) : (
    <form
      className="flex flex-col items-center justify-center space-y-4 h-full w-full max-w-sm mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}
    >
      <div className="flex items-center space-x-2">
        <BeakerIcon className="w-10 h-10 text-white" />
        <p className="font-bold text-white text-3xl">SIGN IN</p>
      </div>
      <input
        placeholder="Email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 w-full outline-lime-500 text-xl"
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 w-full outline-lime-500 text-xl"
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex space-x-4">
          <button
            className="bg-lime-500 text-white font-bold px-4 py-2 text-xl"
            type="submit"
          >
            SIGN IN
          </button>
          <button
            className="bg-red-500 text-white font-bold px-4 py-2 text-xl"
            type="button"
            onClick={() => setShowSignUp(true)}
          >
            SIGN UP
          </button>
        </div>
      )}
    </form>
  );
};

export default SignIn;
