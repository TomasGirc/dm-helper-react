import { usePathname } from "next/navigation";
import { SubMenuItemProps } from "src/entities/types";
import { ConditionalLink } from "../helpers/ConditionalLink";

export function HoveredSubMenuItem({ icon, text, href }: SubMenuItemProps) {
  const pathname = usePathname();
  return (
    <ConditionalLink link={href}>
      <div
        className={`my-2 rounded-md p-2 ${
          pathname === href ? "bg-gray-300" : " hover:bg-indigo-50"
        }`}
      >
        <div className="flex items-center justify-center ">
          <span className="text-primary-500 h-6 w-6 ">{icon}</span>
          <span className="text-primary-500 ml-3 w-28 text-start">{text}</span>
          <div className="bg-primary-200 h-1" />
        </div>
      </div>
    </ConditionalLink>
  );
}
