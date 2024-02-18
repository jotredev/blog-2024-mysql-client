import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white h-full flex flex-col items-center justify-center px-8">
        <h1 className="text-8xl font-bold">404</h1>
        <h3 className="text-2xl font-medium mb-5 text-center">
          ¡Ooooooops página no encontrada!
        </h3>
        <Link to="/" className="underline">
          Regresar a inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
