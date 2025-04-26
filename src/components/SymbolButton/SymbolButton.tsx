import "./SymbolButton.css"
import { FaCircleUser } from "react-icons/fa6"; // usuario
import { MdFileDownload } from "react-icons/md"; // descarga
import { HiPencil } from "react-icons/hi2"; // editar
import { FaArrowLeft, FaRegCalendar, FaPlusCircle, FaEye, FaEyeSlash } from "react-icons/fa"; // back & calendar & plus & ojo abierto & ojo cerrado
import { GoChevronDown } from "react-icons/go"; // flecha abajo

export interface SymbolButtonProps {
    variant: "user" | "back" | "download" | "edit" | "calendar" | "arrow-down" | "add" | "opened-eye" | "closed-eye";
    onClick?: () => void;
}

export const SymbolButton: React.FC<SymbolButtonProps> = ({
    variant,
    onClick,
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
        default:
          return null;
      }
    };
  
    return (
      <div>
        <button onClick={onClick} className="symbolButton">
          {icon()}
        </button>
      </div>
    );
  };