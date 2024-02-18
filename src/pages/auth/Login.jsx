import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const LoginPage = () => {
  return (
    <>
      <form>
        <div className="mb-5">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="text"
            className="mt-2 bg-transparent border py-2 px-4 rounded-lg w-full outline-none"
            placeholder="mail@example.com"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="mt-2 bg-transparent border py-2 px-4 rounded-lg w-full outline-none"
            placeholder="********"
          />
        </div>
        <div>
          <Button text="Ingresar" type="submit" />
        </div>
      </form>
      <div className="mt-5 text-center">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link to="/auth/register" className="underline">
            Registrate
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
