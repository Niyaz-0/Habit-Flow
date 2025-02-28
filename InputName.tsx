import { useEffect, useRef } from "react";
import { useGlobalContextProvider } from "./app/contextApi";
import { darkModeColor } from "./colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
interface InputNameProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputlabel?: string;
}

export default function InputName({
  placeholder = "",
  inputlabel = "",

  ...rest
}: InputNameProps) {
  const {
    darkModeObject: { isDarkMode },
    openAreaFormObject: { openAreaForm },
    openIconWindowObject: { setOpenIconWindow, iconSelected },
  } = useGlobalContextProvider();

  console.log(iconSelected);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [openAreaForm]);
  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="opacity-80 font-semibold">{inputlabel}</span>
      <div className="flex gap-4 justify-between   items-center w-full">
        <input
          ref={inputRef}
          style={{
            backgroundColor: isDarkMode ? darkModeColor.background : "#fff",
          }}
          className={`border w-full border-gray-200 outline-none p-4 rounded-md text-[13px]  `}
          placeholder={placeholder}
          {...rest}
        />

        <FontAwesomeIcon
          className="bg-mainColor mt-[1px] p-4 rounded-md text-white cursor-pointer bg-customRed "
          height={16}
          width={20}
          onClick={() => setOpenIconWindow(true)}
          icon={iconSelected}
        />
      </div>
    </div>
  );
}
