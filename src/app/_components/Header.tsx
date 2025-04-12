'use client';
import { usePathname } from "next/navigation";
import { memo } from 'react';
import { MenuProvider } from './MenuContext';
import { SearchProvider } from './SearchContext';
import BellIcon from "./Icons/Bell";
import CalendarIcon from "./Icons/Calendar";
import LogoIcon from "./Icons/Logo";
import NavigationComponent from "./Navigation";
import ProfileComponent from "./Profile";
import SearchComponent from "./Search";
import MobileMenuButtonIcon from "./Icons/MobileMenuButton";

function HeaderComponent() {
  const Logo = memo(LogoIcon);
  const Search = memo(SearchComponent);
  const Calendar = memo(CalendarIcon);
  const Bell = memo(BellIcon);
  const Profile = memo(ProfileComponent);
  const MobileMenuButton = memo(MobileMenuButtonIcon);
  const Navigation = memo(NavigationComponent);
  const pathname = usePathname();

  if (pathname?.includes("/article/")) return null;

  return (
    <MenuProvider>
      <SearchProvider>
        <header className="flex flex-col container mx-auto md:px-6 2xl:px-16 pt-4 mb-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-5 items-center hover:opacity-80 transition-opacity duration-200">
              <Logo />
            </div>
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <Search />
            </div>
            <div className="hidden md:flex space-x-5 items-center">
              <div className="hover:scale-105 transition-transform duration-200">
                <Calendar width={25} height={25} />
              </div>
              <div className="hover:scale-105 transition-transform duration-200">
                <Bell />
              </div>
              <div className="hover:opacity-90 transition-opacity duration-200">
                <Profile />
              </div>
            </div>
            <div className="md:hidden">
              <MobileMenuButton />
            </div>
          </div>
          <div className="md:hidden mt-4">
            <Search />
          </div>
          <Navigation />
        </header>
        <hr />
      </SearchProvider>
    </MenuProvider>
  );
}

const MemoizedHeader = memo(HeaderComponent);
export default MemoizedHeader;
