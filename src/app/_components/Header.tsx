import Bell from "./Bell";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Profile from "./Profile";
import Search from "./Search";

export default function Header() {
  return (
    <>
      <header className="flex flex-col container mx-auto pt-4 mb-2">
        <div className="flex justify-between">
          <div className="flex space-x-5 items-center">
            <Logo />
          </div>
          <Search />
          <div className="flex space-x-5 items-center">
            <Bell />
            <Profile />
          </div>
        </div>
        <Navigation />
      </header>
      <hr />
    </>
  );
}
