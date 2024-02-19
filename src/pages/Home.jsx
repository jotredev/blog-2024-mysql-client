import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Post from "../components/widgets/Post";
import useAuth from "../hooks/useAuth";
import { axiosClient } from "../services/AxiosClient";

import { RiSearch2Line, RiWifiOffLine } from "react-icons/ri";

import Loading from "../components/ui/Loading";
import { useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { auth, isOnline, isLoading, setIsLoading } = useAuth();

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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loading />;
  return (
    <>
      {!auth.id ? (
        <Navigate to="/auth/login" />
      ) : (
        <div className="p-5 md:p-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-10">
            <h1 className="text-xl font-medium">Todos los posts</h1>
            <div className="w-full max-w-md relative">
              <RiSearch2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full bg-white py-2 pl-12 pr-4 rounded-lg outline-none"
                placeholder="Buscar por título, contenido o autor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {filteredPosts.length > 0 ? (
            <ul className="border-l border-black border-dashed pl-5 md:pl-8">
              {filteredPosts.map((post, index) => (
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
      {!isOnline && (
        <div className="fixed right-0 bottom-0 bg-yellow-500 py-2 px-5">
          <p className="flex items-center gap-2">
            <RiWifiOffLine /> Sin conexión de internet
          </p>
        </div>
      )}
    </>
  );
};

export default HomePage;
