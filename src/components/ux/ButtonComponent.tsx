export const ButtonComponent = ({
  onClick,
  children,
  colorBg,
  colorTxt,
  border = true,
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  colorBg?: string;
  colorTxt?: string;
  border?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      className={`
        ${colorBg ? colorBg : "bg-blue-500"} 
        ${colorTxt ? colorTxt : "text-white"} 
        ${
          border
            ? "rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            : ""
        } 
        active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 `}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
