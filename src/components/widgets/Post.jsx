import { Link } from "react-router-dom";
import { dateFormat } from "../../helpers/Dates";

import { RiArrowRightSLine } from "react-icons/ri";

const Post = ({ data }) => {
  const {
    id,
    title,
    shortDescription,
    user: { name },
    createdAt,
  } = data;
  return (
    <article className="bg-white p-5 rounded-xl">
      <div className="flex flex-col lg:flex-row flex-col-reverse items-start justify-between gap-3">
        <div className="relative">
          <p className="xl:absolute text-xs top-2 -left-48">
            {dateFormat(createdAt)}
          </p>
          <Link
            to={`/posts/${id}`}
            className="text-2xl font-semibold hover:underline"
          >
            {title}
          </Link>
        </div>
        <div className="flex mt-1 shrink-0 items-center gap-x-2">
          <span className="bg-black w-6 h-6 flex items-center justify-center rounded-full text-white text-xs uppercase">
            {`${name?.charAt(0)}${name?.charAt(1)}`}
          </span>
          <h4 className="text-sm">{name}</h4>
        </div>
      </div>
      <p className="my-3 text-gray-500">{shortDescription}</p>
      <Link
        to={`/posts/${id}`}
        className="flex items-center gap-x-1 w-max hover:underline"
      >
        Ver más
        <RiArrowRightSLine size={20} className="mt-1" />
      </Link>
    </article>
  );
};

export default Post;
