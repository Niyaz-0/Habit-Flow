interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: "Gray" | "Yellow" | "Red" | "Orange";
  size?: "small" | "medium" | "large";
  icon?:
    | "plus"
    | "minus"
    | "check"
    | "close"
    | "menu"
    | "search"
    | "home"
    | "settings"
    | "user";
}

export default function Button({
  className = "",
  onClick,
  size = "medium",
  children,
  color = "Gray",
  icon,
  ...rest
}: ButtonProps) {
  let colorClass = "";
  let sizeClass = "";
  let defaultClass =
    " flex items-center justify-center gap-2 p-3 rounded-md w-full";

  //Determine the color class
  switch (color) {
    case "Yellow":
      colorClass = "bg-yellow-500";
      break;
    case "Red":
      colorClass = "bg-red-500";
      break;
    case "Orange":
      colorClass = "bg-orange-500";
      break;
    case "Gray":
      break;
    default:
      colorClass = "bg-slate-300";
      break;
  }

  //Determine the size class
  switch (size) {
    case "small":
      sizeClass = "px-2 py-1 text-sm";
      break;
    case "medium":
      sizeClass = "p-4 text-base";
      break;
    case "large":
      sizeClass = "px-6 py-3 text-lg";
      break;
    default:
      sizeClass = "px-4 py-2 text-base";
      break;
  }

  let iconComponent: React.ReactNode = null;
  // Plus icon
  const PlusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 0 1 0 2h-5v5a1 1 0 1 1-2 0v-5H5a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Home icon
  const HomeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 0 1 1 1v9h2a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM6 9V7a1 1 0 1 1 2 0v2h2V6a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm9.707-.293l-4-4a1 1 0 0 0-1.414 0l-4 4a1 1 0 1 0 1.414 1.414L11 7.414V17a1 1 0 1 0 2 0V7.414l2.293 2.293a1 1 0 0 0 1.414-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Settings icon
  const SettingsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M18.55 10a8.55 8.55 0 1 1-17.1 0 8.55 8.55 0 0 1 17.1 0zM10 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6.364-2.05a6 6 0 0 0-1.414-1.414l-1.42 1.42A4.008 4.008 0 0 0 14 12h-1.95a6.005 6.005 0 0 0-1.414-1.414l1.42-1.42A4.008 4.008 0 0 0 12 8V6a2 2 0 1 0-4 0v2a4.004 4.004 0 0 0 .344 1.586l-1.42 1.42A6.005 6.005 0 0 0 4.95 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.95a6.005 6.005 0 0 0 1.414 1.414l1.42-1.42A4.004 4.004 0 0 0 8 18h1.95a2 2 0 1 0 4 0H16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1.95zM10 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
        clipRule="evenodd"
      />
    </svg>
  );

  // User icon
  const UserIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M10 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM5 12a5 5 0 0 1 10 0v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1zm6-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  switch (icon) {
    case "plus":
      iconComponent = <PlusIcon />;
      break;
    case "home":
      iconComponent = <HomeIcon />;
      break;
    case "settings":
      iconComponent = <SettingsIcon />;
      break;
    case "menu":
      // iconComponent = <MenuIcon />;
      break;
    case "user":
      iconComponent = <UserIcon />;
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${colorClass} ${sizeClass} ${defaultClass} ${className} `}
      {...rest}
    >
      {icon && <span>{iconComponent}</span>}
      {children}
    </button>
  );
}
