import Post from "../components/widgets/Post";

const HomePage = () => {
  return (
    <div className="p-5 md:p-0">
      <h1 className="text-xl font-medium mb-10">Todos los posts</h1>
      <ul className="border-l border-black border-dashed pl-5 md:pl-8">
        <li className="relative before:absolute before:w-4 before:h-4 before:-left-[28px] md:before:-left-[40px] before:top-7 before:bg-black before:rounded-full before:border-4 before:border-gray-100 mb-8">
          <Post />
        </li>
        <li className="relative before:absolute before:w-4 before:h-4 before:-left-[28px] md:before:-left-[40px] before:top-7 before:bg-black before:rounded-full before:border-4 before:border-gray-100 mb-8">
          <Post />
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
