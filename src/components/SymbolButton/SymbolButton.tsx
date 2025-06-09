import "./SymbolButton.css";
import { FaCircleUser } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { FaArrowLeft, FaRegCalendar, FaPlusCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { IoHomeSharp } from "react-icons/io5";

export interface SymbolButtonProps {
  variant:
    | "user"
    | "back"
    | "download"
    | "edit"
    | "calendar"
    | "arrow-down"
    | "add"
    | "opened-eye"
    | "closed-eye"
    | "home";
  clickFunc?: () => void;
}

export const SymbolButton: React.FC<SymbolButtonProps> = ({
  variant,
  clickFunc,
}) => {
  const icon = () => {
    switch (variant) {
      case "user":
        return <FaCircleUser />;
      case "back":
        return <FaArrowLeft />;
      case "download":
        return <MdFileDownload />;
      case "edit":
        return <HiPencil />;
      case "calendar":
        return <FaRegCalendar />;
      case "arrow-down":
        return <GoChevronDown />;
      case "add":
        return <FaPlusCircle />;
      case "opened-eye":
        return <FaEye />;
      case "closed-eye":
        return <FaEyeSlash />;
      case "home":
        return <IoHomeSharp />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button
        onClick={clickFunc}
        className="symbolButton"
        type="button" 
      >
        {icon()}
      </button>
    </div>
  );
};
