'use client';
import { usePathname } from 'next/navigation';
import { memo } from 'react';
import { MenuProvider } from './MenuContext';
import { SearchProvider } from './SearchContext';
import BellIcon from './Icons/Bell';
import CalendarIcon from './Icons/Calendar';
import LogoIcon from './Icons/Logo';
import NavigationComponent from './Navigation';
import ProfileComponent from './Profile';
import SearchComponent from './Search';
import MobileMenuButtonIcon from './Icons/MobileMenuButton';

// memoize once, at module scope
const MemoLogo           = memo(LogoIcon);
const MemoSearch         = memo(SearchComponent);
const MemoCalendar       = memo(CalendarIcon);
const MemoBell           = memo(BellIcon);
const MemoProfile        = memo(ProfileComponent);
const MemoMobileMenuBtn  = memo(MobileMenuButtonIcon);
const MemoNavigation     = memo(NavigationComponent);

function HeaderComponent() {
  const pathname = usePathname();
  if (pathname?.includes('/article/')) return null;

  return (
    <MenuProvider>
      <SearchProvider>
        <header className="flex flex-col container mx-auto md:px-6 2xl:px-16 pt-4 mb-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-5 items-center hover:opacity-80 transition-opacity duration-200">
              <MemoLogo />
            </div>
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <MemoSearch />
            </div>
            <div className="hidden md:flex space-x-5 items-center">
              <div className="hover:scale-105 transition-transform duration-200">
                <MemoCalendar width={25} height={25} />
              </div>
              <div className="hover:scale-105 transition-transform duration-200">
                <MemoBell />
              </div>
              <div className="hover:opacity-90 transition-opacity duration-200">
                <MemoProfile />
              </div>
            </div>
            <div className="md:hidden">
              <MemoMobileMenuBtn />
            </div>
          </div>
          <div className="md:hidden mt-4">
            <MemoSearch />
          </div>
          <MemoNavigation />
        </header>
        <hr />
      </SearchProvider>
    </MenuProvider>
  );
}

export default memo(HeaderComponent);
