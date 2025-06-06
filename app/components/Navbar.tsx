"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <header className="p-2 m-2">
      <Link href="/tasks">Task Manager</Link>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : session?.user ? (
        <div>
          {session.user.name}
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Sign In</button>
      )}
    </header>
  );
};

export default Navbar;
