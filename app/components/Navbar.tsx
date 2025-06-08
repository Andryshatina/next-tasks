"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";

const Navbar = () => {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-xl dark:border-neutral-700/50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/tasks"
            className="text-xl font-semibold tracking-tight text-neutral-900 transition-colors duration-200 hover:text-orange-400 dark:text-neutral-100"
          >
            Task Manager
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-neutral-200 bg-neutral-100 p-2 transition-all duration-200 hover:border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:border-neutral-500"
            >
              {theme === "dark" ? (
                <svg
                  className="h-5 w-5 text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-neutral-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {status === "loading" ? (
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-orange-500 dark:border-neutral-600 dark:border-t-orange-500"></div>
                <span className="text-sm">Loading...</span>
              </div>
            ) : session?.user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-neutral-200 dark:border-neutral-600"
                    />
                  )}
                  <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {session.user.name}
                  </span>
                </div>

                <button
                  onClick={() => signOut()}
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="rounded-xl bg-orange-500 px-6 py-2 font-medium text-white shadow-lg transition-colors duration-200 hover:bg-orange-600 hover:shadow-orange-500/25"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
