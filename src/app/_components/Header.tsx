import { MenuProvider } from './MenuContext';
import { SearchProvider } from './SearchContext';
import Bell from "./Bell";
import Calendar from "./Calendar";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Profile from "./Profile";
import Search from "./Search";
import MobileMenuButton from "./MobileMenuButton";

export default function Header() {
  return (
    <MenuProvider>
      <SearchProvider>
        <header className="flex flex-col container mx-auto px-4 pt-4 mb-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-5 items-center">
              <Logo />
            </div>
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <Search />
            </div>
            <div className="hidden md:flex space-x-5 items-center">
              <Calendar/>
              <Bell />
              <Profile />
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
