'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenu } from './MenuContext';

export default function Navigation() {
  const pathname = usePathname();
  const { isMenuOpen } = useMenu();
  const link = 'font-semibold text-neutral-500';
  const activeLink = 'font-semibold text-black border-b-2 border-black pb-[9px]';
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/learning', label: 'My Learning' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/achievements', label: 'Achievements' },
  ];

  return (
    <nav className="mt-5">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href} 
              className={pathname === item.href ? activeLink : link}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <ul className={`md:hidden flex flex-col space-y-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href} 
              className={`block ${pathname === item.href ? 'text-black font-semibold' : 'text-neutral-500'}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
