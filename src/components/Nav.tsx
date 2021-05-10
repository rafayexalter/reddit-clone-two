import { signin, signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import useSWR from "swr";
import { fetchData } from "../utils";

export default function Nav() {
  const router = useRouter();
  const [session, loading] = useSession();

  const { data, error } = useSWR(`/api/subreddit`, fetchData);

  const subToOptions = () => {
    if (!data) return;

    const options = data.map((sub) => ({
      value: sub.id,
      label: sub.name,
    }));

    return options;
  };

  return (
    <nav className="flex items-center justify-between py-4 bg-white">
      <div className="flex items-center">
        <Link href="/">
          <div className="w-12 h-12 mx-4 bg-red-300 rounded-full cursor-pointer" />
        </Link>
        <Link href="/">
          <a className="hidden text-2xl font-bold text-gray-700 md:block hover:text-indigo-200">
            reddit
          </a>
        </Link>
      </div>
      <div className="w-full mr-4 md:w-1/3 md:mr-0">
        <Select
          options={subToOptions()}
          instanceId="subSearch"
          onChange={(e) => {
            router.push(`/r/${e.label}`);
          }}
        />
      </div>

      <h3 className="hidden text-xl font-bold text-gray-700 md:block"></h3>
      <div className="mr-4 text-xl font-bold text-gray-700 hover:text-indigo-200">
        {!session && (
          <button
            onClick={() => {
              signin();
            }}
          >
            Login
          </button>
        )}
        {session && (
          <button
            onClick={() => {
              router.push("/");
              signOut();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
