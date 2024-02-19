import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { toast } from "sonner";

import { cn, Toolbar } from "../lib/utils";
import { axiosClient } from "../services/AxiosClient";

import Button from "../components/ui/Button";
import useAuth from "../hooks/useAuth";
import Loading from "../components/ui/Loading";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  const { auth, isLoading, setIsLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([title, content].includes("")) {
      return toast.error("Todos los campos son obligatorios");
    }

    if (title.length < 10) {
      return toast.error("El título debe contener al menos 10 caracteres");
    }

    if (desc.length > 70) {
      return toast.error(
        "La descripción corta no debe contener más de 70 caracteres"
      );
    }

    const toastLoading = toast.loading("Escribiendo post...");

    try {
      setIsLoading(true);

      const token = localStorage.getItem("token2024");

      if (!token) {
        setIsLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        "/posts/create",
        {
          title,
          shortDescription: desc,
          content,
        },
        config
      );

      if (data.response === "success") {
        toast.success("Post creado.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
      toast.dismiss(toastLoading);
      setTitle("");
      setContent("");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {!auth.id ? (
        <Navigate to="/auth/login" />
      ) : (
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              className="mt-2 bg-transparent border border-gray-300 py-2 px-4 rounded-lg w-full outline-none"
              placeholder="Aprende programación en 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="desc">Descripción corta</label>
            <textarea
              id="desc"
              className="mt-2 bg-transparent border border-gray-300 py-2 px-4 rounded-lg w-full outline-none resize-none"
              placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quis, obcaecati a modi quaerat dolorem eaque perferendis odit nam quam labore maiores pariatur, deleniti maxime neque nulla, rem vel sequi?"
              rows={5}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <p className="text-sm text-gray-500 float-right">
              <span className={cn("", desc.length > 70 && "text-red-500")}>
                {desc.length}
              </span>{" "}
              / 70
            </p>
          </div>
          <div className="mb-5">
            <label htmlFor="title">Contenido</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={{
                toolbar: Toolbar,
              }}
              className="mt-4"
            />
          </div>
          <div className="float-left">
            <Button text="Crear post" type="submit" disabled={isLoading} />
          </div>
        </form>
      )}
    </>
  );
};

export default CreatePostPage;
