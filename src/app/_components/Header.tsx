import { MenuProvider } from './MenuContext';
import { SearchProvider } from './SearchContext';
import Bell from "./Icons/Bell";
import Calendar from "./Icons/Calendar";
import Logo from "./Icons/Logo";
import Navigation from "./Navigation";
import Profile from "./Profile";
import Search from "./Search";
import MobileMenuButton from "./Icons/MobileMenuButton";

export default function Header() {
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
                <Calendar width={25} height={25}/>
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
