import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-md p-5 rounded-lg">
        <h1 className="text-xl font-semibold uppercase mb-5 tracking-[5px]">
          {pathname === "/auth/login" ? "Iniciar sesión" : "Registrate"}
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
