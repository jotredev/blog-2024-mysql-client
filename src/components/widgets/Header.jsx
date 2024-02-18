import { Link } from "react-router-dom";
import { RiSearch2Line, RiArrowRightSLine, RiPencilFill } from "react-icons/ri";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 w-full bg-white py-4 z-50">
      <div className="max-w-[1000px] mx-auto px-5 lg:px-0 flex items-center justify-between">
        <Logo />
        {/* <div className="w-full max-w-md hidden md:block">
          <div className="w-full relative">
            <RiSearch2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="bg-gray-100 py-2 pl-12 pr-4 rounded-lg outline-none w-full"
              placeholder="Buscar por títutlo, contenido o autor."
            />
          </div>
        </div> */}
        <div className="flex items-center gap-3">
          <Link
            to="/new"
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            <RiPencilFill />
          </Link>
          <button className="flex items-center gap-x-3">
            <span className="bg-black w-7 h-7 flex items-center justify-center rounded-full text-white text-sm">
              JT
            </span>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold">Jorge Luis Trejo</h4>
                <RiArrowRightSLine className="mt-0.5" />
              </div>
              <p className="text-xs text-gray-500">jorgeetrejoo@gmail.com</p>
            </div>
          </button>
        </div>
        {/* <nav className="flex items-center gap-x-5">
          <Link to="/auth/login" className="hover:underline">
            Iniciar sesión
          </Link>
          |
          <Link to="/auth/register" className="hover:underline">
            Crear cuenta
          </Link>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
