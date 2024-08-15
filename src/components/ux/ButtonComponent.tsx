export const ButtonComponent = ({
  onClick,
  children,
  colorBg,
  colorTxt,
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  colorBg?: string;
  colorTxt?: string;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      className={`
        ${colorBg ? colorBg : "bg-blue-500"} 
        ${colorTxt ? colorTxt : "text-white"} 
        active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
