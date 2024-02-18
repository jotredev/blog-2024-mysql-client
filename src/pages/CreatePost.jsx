import { useState } from "react";
import ReactQuill from "react-quill";
import { Toolbar } from "../lib/utils";

const CreatePostPage = () => {
  const [content, setContent] = useState();

  return (
    <div>
      <form>
        <div className="mb-5">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            className="mt-2 bg-transparent border border-gray-300 py-2 px-4 rounded-lg w-full outline-none"
            placeholder="Aprende programación en 2024"
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
      </form>
    </div>
  );
};

export default CreatePostPage;
