import { HiArrowLeft } from "react-icons/hi";

const CustomLeftArrow = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-5 m-auto h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full border-[1px] border-gray-200 hover:!bg-white hover:text-red-600 hover:border-2 hover:border-red-600 duration-300 ease-in"
      aria-label="Next"
    >
      <HiArrowLeft className="text-base" />
    </button>
  );
};

export default CustomLeftArrow;
