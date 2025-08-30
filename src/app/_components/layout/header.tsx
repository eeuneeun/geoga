"use client";
import { House, LogIn, LogOut, Sticker } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useUserStore } from "src/app/_store/UserStore";

type Props = {};

export default function Header({}: Props) {
  const { accessToken, signOut } = useUserStore();
  return (
    <header className="header flex-center">
      <Link href="/">
        <House color="white" />
      </Link>
      <div className="sign-group">
        {accessToken == null ? (
          <>
            <Link href="/signUp">
              <Sticker color="white" />
            </Link>

            <Link href="/signIn">
              <LogIn color="white" />
            </Link>
          </>
        ) : (
          <button onClick={signOut}>
            <LogOut color="white" />
          </button>
        )}
      </div>
    </header>
  );
}
