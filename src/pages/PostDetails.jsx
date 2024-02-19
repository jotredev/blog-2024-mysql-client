import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { axiosClient } from "../services/AxiosClient";
import useAuth from "../hooks/useAuth";
import ReactQuill from "react-quill";

import Loading from "../components/ui/Loading";

const PostDetailsPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  const { auth, isLoading, setIsLoading } = useAuth();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
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

        const { data } = await axiosClient.get(`/posts/${postId}`, config);

        if (data.response === "success") {
          setPost(data.post);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [postId]);

  if (isLoading) return <Loading />;

  return (
    <>
      {auth.id ? (
        <div className="p-5">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <ReactQuill
            theme="snow"
            value={post.content}
            readOnly
            modules={{
              toolbar: false,
            }}
            className="mt-4 quill-readonly"
          />
          <hr className="my-10" />
          <div>
            <div className="flex mt-1 shrink-0 items-center gap-x-2">
              <span className="bg-black w-8 h-8 flex items-center justify-center rounded-full text-white text-xs uppercase">
                {`${post.user?.name?.charAt(0)}${post.user?.name?.charAt(1)}`}
              </span>
              <div>
                <h4 className="font-medium">{post.user?.name}</h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};

export default PostDetailsPage;
