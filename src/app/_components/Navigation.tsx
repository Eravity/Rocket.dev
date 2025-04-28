'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenu } from './MenuContext';
import { useCallback, memo } from 'react';

// Constants outside component
const linkClass = 'font-semibold text-neutral-500';
const activeLinkClass = 'font-semibold text-black border-b-2 border-black pb-[9px]';
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/learning', label: 'My Learning' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/terminal', label: 'Terminal' },
  { href: '/achievements', label: 'Achievements' },
];

// Separate memoized component for each nav link
type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  isMobile?: boolean;
};

const NavLink = memo(({ href, label, isActive, isMobile = false }: NavLinkProps) => {
  
  const className = isMobile 
    ? `block ${isActive ? 'text-black font-semibold' : 'text-neutral-500'}`
    : isActive ? activeLinkClass : linkClass;
  
  const handleClick = (e: React.MouseEvent) => {
    if (isActive) {
      e.preventDefault();
    }
  };
  
  return (
    <li>
      <Link 
        href={href} 
        className={className}
        onClick={handleClick}
      >
        {label}
      </Link>
    </li>
  );
});

NavLink.displayName = 'NavLink';

// Define components OUTSIDE the main component
type DesktopNavigationProps = {
  pathname: string;
};

const DesktopNavigation = memo(({ pathname }: DesktopNavigationProps) => {
  const isLinkActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.includes(href);
  }, [pathname]);

  return (
    <ul className="hidden md:flex mt-4 space-x-8">
      {navItems.map((item) => (
        <NavLink 
          key={item.href}
          href={item.href} 
          label={item.label}
          isActive={isLinkActive(item.href)}
        />
      ))}
    </ul>
  );
});

DesktopNavigation.displayName = 'DesktopNavigation';

type MobileNavigationProps = {
  pathname: string;
  isMenuOpen: boolean;
};

const MobileNavigation = memo(({ pathname, isMenuOpen }: MobileNavigationProps) => {
  const isLinkActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.includes(href);
  }, [pathname]);

  return (
    <ul className={`md:hidden flex flex-col space-y-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
      {navItems.map((item) => (
        <NavLink 
          key={item.href}
          href={item.href} 
          label={item.label}
          isActive={isLinkActive(item.href)}
          isMobile
        />
      ))}
    </ul>
  );
});

MobileNavigation.displayName = 'MobileNavigation';

// Main navigation component
function Navigation() {
  const { isMenuOpen } = useMenu();
  const pathname = usePathname();
  
  return (
    <>
      <DesktopNavigation pathname={pathname} />
      <MobileNavigation pathname={pathname} isMenuOpen={isMenuOpen} />
    </>
  );
}

export default memo(Navigation);
