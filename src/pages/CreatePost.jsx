import { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "sonner";

import { Toolbar } from "../lib/utils";
import { axiosClient } from "../services/AxiosClient";

import Button from "../components/ui/Button";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([title, content].includes("")) {
      return toast.error("Todos los campos son obligatorios");
    }

    if (title.length < 10) {
      return toast.error("El título debe contener al menos 10 caracteres");
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
          content,
        },
        config
      );

      if (data.response === "success") {
        toast.success("Post creado.");
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

  return (
    <div>
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
    </div>
  );
};

export default CreatePostPage;
