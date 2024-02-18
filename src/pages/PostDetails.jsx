import { useState } from "react";
import ReactQuill from "react-quill";
import { Toolbar } from "../lib/utils";

const PostDetailsPage = () => {
  const [content, setContent] = useState();

  return (
    <div>
      <h1>Título</h1>
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
  );
};

export default PostDetailsPage;
