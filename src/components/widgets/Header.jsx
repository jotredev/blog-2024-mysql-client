import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { RiArrowRightSLine, RiPencilFill } from "react-icons/ri";

import Logo from "./Logo";
import Sidebar from "./Sidebar";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { auth, isOnline } = useAuth();

  return (
    <>
      <header className="fixed left-0 top-0 w-full bg-white py-4 z-40">
        <div className="max-w-[1000px] mx-auto px-5 lg:px-0 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            {isOnline && (
              <Link
                to="/new"
                className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                <RiPencilFill />
              </Link>
            )}
            <button
              onClick={() => setShowSidebar(true)}
              className="flex items-center gap-x-3"
            >
              <span className="bg-black w-7 h-7 flex items-center justify-center rounded-full text-white text-sm uppercase">
                {`${auth.name?.charAt(0)}${auth.name?.charAt(1)}`}
              </span>
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">{auth.name}</h4>
                  <RiArrowRightSLine className="mt-0.5" />
                </div>
                <p className="text-xs text-gray-500">{auth.email}</p>
              </div>
            </button>
          </div>
        </div>
      </header>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </>
  );
};

export default Header;
