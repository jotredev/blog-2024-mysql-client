import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { validateEmail } from "../../helpers/Validators";
import { axiosClient } from "../../services/AxiosClient";

import Button from "../../components/ui/Button";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validamos que vengan todos los campos
    if ([name, email, password, confirmPassword].includes("")) {
      return toast.error("Todos los campos son obligatorios");
    }

    // Validamos que sea un email valido
    if (!validateEmail(email)) {
      return toast.error("El correo electrónico no es válido");
    }

    // Validamos la longitud del password
    if (password.length < 6) {
      return toast.error("La contraseña debe contener al menos 6 caracteres");
    }

    // Validamos que los password sean iguales
    if (password !== confirmPassword) {
      return toast.error("Las contraseñas no coinciden");
    }

    const toastLoading = toast.loading("Creando usuario...");

    try {
      setIsLoading(true);
      const { data } = await axiosClient.post("/users/create", {
        name,
        email,
        password,
      });

      if (data.response === "success") {
        toast.success(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
      toast.dismiss(toastLoading);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            type="text"
            className="mt-2 bg-transparent border py-2 px-4 rounded-lg w-full outline-none"
            placeholder="Jorge Trejo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="mb-5">
          <label htmlFor="password2">Repetir contraseña</label>
          <input
            id="password2"
            type="password"
            className="mt-2 bg-transparent border py-2 px-4 rounded-lg w-full outline-none"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <Button text="Crear cuenta" type="submit" disabled={isLoading} />
        </div>
      </form>
      <div className="mt-5 text-center">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/auth/login" className="underline">
            Ingresa
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
