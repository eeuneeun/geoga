import { House } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="header flex-center">
      <Link href="/">
        <House color="white" />
      </Link>
    </header>
  );
}
