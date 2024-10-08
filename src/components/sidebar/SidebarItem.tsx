import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RetractedSidebar } from "./SidebarRetracted";
import { SidebarItemProps } from "src/entities/types";
import { ConditionalLink } from "../helpers/ConditionalLink";

export default function SidebarItem({
  icon,
  text,
  href,
  expanded = false,
  subMenu = null,
}: SidebarItemProps) {
  const [expandSubMenu, setExpandSubMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!expanded) {
      setExpandSubMenu(false);
    }
  }, [expanded]);

  // Calculate the height of the sub-menu assuming each item is 40px tall
  const subMenuHeight = expandSubMenu
    ? `${((subMenu?.length || 0) * 47.5 + (subMenu! && 15)).toString()}px`
    : 0;

  const linkParent = subMenu ? subMenu.find((v) => v.href === pathname) : false;

  return (
    <>
      <li>
        <ConditionalLink link={href}>
          <button
            className={`
         group relative my-1 flex w-full cursor-pointer
         items-center rounded-md px-3
         py-2 font-medium transition-colors
         ${
           pathname === href || linkParent || pathname.includes(href + "/")
             ? "text-primary-500 bg-gradient-to-tr from-indigo-200 to-indigo-100"
             : "text-gray-600 hover:bg-indigo-50"
         }
         ${!expanded && "hidden sm:flex"}
     `}
            onClick={() => setExpandSubMenu((curr) => expanded && !curr)}
          >
            <span className="h-6 w-6">{icon}</span>

            <span
              className={`overflow-hidden text-start transition-all text-main-black font-semibold ${
                expanded ? "ml-3 w-44" : "w-0"
              }`}
            >
              {text}
            </span>
            {subMenu && (
              <div
                className={`absolute right-2 h-4 w-4${
                  expanded ? "" : "top-2"
                } transition-all ${expandSubMenu ? "rotate-90" : "rotate-0"}`}
              >
                *
              </div>
            )}

            {!expanded && <RetractedSidebar text={text} menu={subMenu} />}
          </button>
        </ConditionalLink>
      </li>
      <ul className="sub-menu pl-6" style={{ height: subMenuHeight }}>
        {expanded &&
          subMenu?.map((item, index) => (
            <SidebarItem key={index} {...item} expanded={expanded} />
          ))}
      </ul>
    </>
  );
}
