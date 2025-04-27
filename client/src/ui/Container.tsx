
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  const newClassName = twMerge(
    "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8",
    className
  );
  return <div className={newClassName}>{children}</div>;
};

export default Container;
