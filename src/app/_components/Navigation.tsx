'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";


// prettier-ignore
export default function Navigation() {
  const pathname = usePathname();
  const link = 'font-semibold text-neutral-500';
  const activeLink = 'font-semibold text-black border-b-2 border-black pb-[9px]';

  return (
    <nav className="mt-5 flex justify-between">
      <ul className="flex space-x-8">
        <li><Link href="/" className={pathname === '/' ? activeLink : link}>Home</Link></li>
        <li><Link href="/learning" className={pathname === '/learning' ? activeLink : link}>My Learning</Link></li>
        <li><Link href="/catalog" className={pathname === '/catalog' ? activeLink : link}>Catalog</Link></li>
        <li><Link href="/favorites" className={pathname === '/favorites' ? activeLink : link}>Favorites</Link></li>
      </ul>
    </nav>
  );
}
