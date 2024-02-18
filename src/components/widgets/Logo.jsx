import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <h1 className="flex items-center gap-x-1 uppercase font-bold">
        <span className="bg-black w-7 h-7 flex items-center justify-center text-white rounded-full">
          B
        </span>
        log
      </h1>
    </Link>
  );
};

export default Logo;
