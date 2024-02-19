import { cn } from "../../lib/utils";

const Button = ({ text, type = "button", disabled }) => {
  return (
    <button
      type={type}
      className={cn(
        "bg-black w-full py-2 px-4 text-white rounded-lg hover:ring-2 ring-black ring-offset-2 ring-offset-red-white transition-all duration-300"
      )}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
