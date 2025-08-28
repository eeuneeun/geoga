import Link from "next/link";
import React from "react";

type Props = {};

export default function BottomNav({}: Props) {
  return (
    <nav className="nav">
      <ul className="flex-between">
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/calendar">calendar</Link>
        </li>
        <li>
          <Link href="/summary">summary</Link>
        </li>
        <li>
          <Link href="/recent">recent</Link>
        </li>
      </ul>
    </nav>
  );
}
