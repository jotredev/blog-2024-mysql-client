import { RiLoader2Fill } from "react-icons/ri";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black flex items-center justify-center z-50">
      <RiLoader2Fill size={24} className="text-white animate-spin" />
    </div>
  );
};

export default Loading;
