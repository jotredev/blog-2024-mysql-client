import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { cn } from "../../lib/utils";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const onLogout = () => {
    setShowSidebar(false);
    logout();
    navigate("/auth/login");
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 w-72 h-full bg-white z-50 p-5 flex flex-col justify-between transition-all duration-300 ease-in-out",
          showSidebar ? "right-0" : "-right-full"
        )}
      >
        <div>
          <div className="mb-8">
            <span className="w-40 h-40 mx-auto flex items-center justify-center bg-black text-white text-6xl font-bold rounded-full ring-8 ring-gray-300 uppercase">
              {`${auth.name?.charAt(0)}${auth.name?.charAt(1)}`}
            </span>
          </div>
          <div className="text-center">
            <h3 className="font-bold">{auth.name}</h3>
            <h5 className="text-gray-500 text-sm">{auth.email}</h5>
          </div>
        </div>
        <ul>
          <li>
            <button
              onClick={() => onLogout()}
              className="w-full py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
      <div
        role="button"
        onClick={() => setShowSidebar(false)}
        className={cn(
          "fixed w-full h-full left-0 top-0 bg-black/30 z-40",
          showSidebar ? "block" : "hidden"
        )}
      />
    </>
  );
};

export default Sidebar;
