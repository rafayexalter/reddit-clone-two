import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      Home page
    </div>
  );
}
