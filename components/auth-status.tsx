"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="auth-status auth-status--loading">…</span>;
  }

  if (!session?.user) {
    return (
      <Link className="topbar__link" href="/login">
        Sign in
      </Link>
    );
  }

  const email = session.user.email ?? "Signed in";

  return (
    <div className="auth-status">
      <span className="auth-status__email" title={email}>
        {email}
      </span>
      <button
        type="button"
        className="auth-status__signout"
        onClick={() => {
          void signOut({ callbackUrl: "/dev/login" });
        }}
      >
        Sign out
      </button>
    </div>
  );
}
