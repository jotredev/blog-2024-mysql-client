import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Post from "../components/widgets/Post";
import useAuth from "../hooks/useAuth";
import { axiosClient } from "../services/AxiosClient";

import Loading from "../components/ui/Loading";
import { useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
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

        const { data } = await axiosClient.get("/posts", config);
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      {!auth.id ? (
        <Navigate to="/auth/login" />
      ) : (
        <div className="p-5 md:p-0">
          <h1 className="text-xl font-medium mb-10">Todos los posts</h1>
          {posts.length > 0 ? (
            <ul className="border-l border-black border-dashed pl-5 md:pl-8">
              {posts.map((post, index) => (
                <li
                  key={index}
                  className="relative before:absolute before:w-4 before:h-4 before:-left-[28px] md:before:-left-[40px] before:top-7 before:bg-black before:rounded-full before:border-4 before:border-gray-100 mb-8"
                >
                  <Post data={post} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="my-20 text-center">
              <p>No hay ningún post</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
