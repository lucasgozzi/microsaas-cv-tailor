"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function NavAuth() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-white/70 sm:block">{session.user.email}</span>
        <button
          onClick={() => signOut()}
          className="text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="text-sm font-medium text-white/70 hover:text-white transition-colors"
    >
      Entrar →
    </button>
  );
}
