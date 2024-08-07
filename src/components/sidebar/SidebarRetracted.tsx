import { SubMenuItemProps } from "src/assets/types";
import { HoveredSubMenuItem } from "./SidebarHoveredSubMenu";

export function RetractedSidebar({
  text,
  menu,
}: {
  text: string;
  menu: SubMenuItemProps[] | null;
}) {
  return (
    <div
      className={`
              text-primary-500 invisible absolute left-full ml-6 -translate-x-3
              rounded-md bg-indigo-100 px-2
              py-1 text-sm opacity-20 transition-all
              group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
          `}
    >
      {!menu
        ? text
        : menu.map((item, index) => (
            <HoveredSubMenuItem
              key={index}
              text={item.text}
              icon={item.icon}
              href={item.href}
            />
          ))}
    </div>
  );
}
