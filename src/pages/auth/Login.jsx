import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { validateEmail } from "../../helpers/Validators";
import { axiosClient } from "../../services/AxiosClient";
import useAuth from "../../hooks/useAuth";

import Button from "../../components/ui/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      return toast.error("Todos los campos son obligatorios");
    }

    if (!validateEmail(email)) {
      return toast.error("El correo electrónico no es válido");
    }

    const toastLoading = toast.loading("Ingresando...");

    try {
      setIsLoading(true);
      const { data } = await axiosClient.post("/users/login", {
        email,
        password,
      });

      if (data.response === "success") {
        localStorage.setItem("token2024", data.token);
        setAuth(data.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
      toast.dismiss(toastLoading);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="text"
            className="mt-2 bg-transparent border py-2 px-4 rounded-lg w-full outline-none"
            placeholder="mail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="mt-2 bg-transparent border py-2 px-4 rounded-lg w-full outline-none"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button text="Ingresar" type="submit" disabled={isLoading} />
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
