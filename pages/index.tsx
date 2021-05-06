import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {!session && (
        <>
          Not signed in
          <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
