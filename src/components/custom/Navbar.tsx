"use client";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-white px-8 py-4 shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo-bemconcreto.svg" width={32} height={32} alt="Bem Concreto" />
        <span className="text-[#6B4A3E] font-semibold text-lg">Bem Concreto Token</span>
      </Link>
      <div className="flex gap-6">
        <Link href="/imoveis" className="text-[#6B4A3E] hover:text-[#5B3C33]">
          Imóveis
        </Link>
        <Link href="/dashboard" className="text-[#6B4A3E] hover:text-[#5B3C33]">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
