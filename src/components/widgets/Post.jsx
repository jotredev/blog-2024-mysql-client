import { Link } from "react-router-dom";

import { RiArrowRightSLine } from "react-icons/ri";

const Post = () => {
  return (
    <article className="bg-white p-5 rounded-xl">
      <div className="flex flex-col lg:flex-row flex-col-reverse items-start justify-between gap-3">
        <div className="relative">
          <p className="xl:absolute text-xs top-2 -left-44">17 de enero 2024</p>
          <Link to="/" className="text-2xl font-semibold hover:underline">
            Como aprender programación en el 2024
          </Link>
        </div>
        <div className="flex mt-1 shrink-0 items-center gap-x-2">
          <span className="bg-black w-6 h-6 flex items-center justify-center rounded-full text-white text-xs">
            JT
          </span>
          <h4 className="text-sm">Jorge Luis Trejo</h4>
        </div>
      </div>
      <p className="my-3 text-gray-500">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae
        delectus at ex doloremque. Atque culpa, ab eaque, sunt repellendus odit
        ipsa at enim dolorem ut illo! Error nam aperiam sint eveniet nemo
        delectus, nulla cumque magnam exercitationem, architecto deleniti
        repellat dolorum alias saepe veritatis eligendi aut corporis earum quam
        voluptates. Inventore perferendis consectetur, similique, at qui
        reiciendis ducimus voluptates accusamus ratione, non iure doloremque
        asperiores dolorum. Nam ut tempora quaerat.
      </p>
      <Link to="/" className="flex items-center gap-x-1 w-max hover:underline">
        Ver más
        <RiArrowRightSLine size={20} className="mt-1" />
      </Link>
    </article>
  );
};

export default Post;
