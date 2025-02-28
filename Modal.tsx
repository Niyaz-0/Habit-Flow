import { Input } from "postcss";
import react from "react";
import Button from "./Button";
import InputName from "./InputName";
import { useGlobalContextProvider } from "./app/contextApi";
import { darkModeColor, defaultColor } from "./colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
//
interface DataFormModalProps {
  isOpen: boolean;
  FormTitle: string;
  className?: string;
  textValue?: string;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export default function DataFormModal({
  FormTitle,
  className = "",
  isOpen,
  textValue,
  onClose,
  onChange,
  onClick,
}: DataFormModalProps) {
  const defaultClasses = `top-[6%] left-1/2 transform -translate-x-1/2 w-[80%]   z-50 p-10 
  rounded-md shadow-md   absolute`;

  const {
    darkModeObject: { isDarkMode },
  } = useGlobalContextProvider();

  return (
    <>
      {isOpen && (
        <div
          style={{
            backgroundColor: isDarkMode
              ? darkModeColor.background
              : defaultColor.background,
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor,
          }}
          className={`${defaultClasses} ${className}`}
        >
          <Header FormTitle={FormTitle} onClose={onClose} />
          <div className="w-full  ">
            <InputName
              inputlabel="Area Name"
              placeholder="Type a name for the area..."
              onChange={onChange}
              value={textValue}
            />
          </div>

          <Button
            onClick={onClick}
            className="bg-customRed text-white mt-10 p-3 px-6"
          >
            {FormTitle === "Add Area" ? "Add Area" : "Edit Area"}
          </Button>
        </div>
      )}
    </>
  );
}

function Header({
  FormTitle,
  onClose,
}: {
  FormTitle: string;
  onClose: () => void;
}) {
  return (
    <div className="flex justify-between items-center ">
      <span className="font-bold text-xl ">{FormTitle}</span>
      <button onClick={onClose} className="text-gray-200 hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
