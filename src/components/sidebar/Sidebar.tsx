import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import SidebarItem from "./SidebarItem";
import { navBarItems } from "src/assets/constants/navbar";

// This sidebar component is for both mobile and desktop
function Sidebar({
  children,
  expanded,
  setExpanded,
}: {
  children: ReactNode;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="relative">
        <div
          className={`fixed inset-0 -z-10 block bg-gray-400  ${
            expanded ? "block sm:hidden" : "hidden"
          }`}
        />
        <aside
          className={`fixed box-border h-screen transition-all ${
            expanded ? "w-5/6 sm:w-64" : "w-1/6 sm:w-20"
          }`}
        >
          <nav className="flex h-full flex-col border-r bg-white shadow-sm">
            <div className="flex items-center justify-between p-4 pb-2">
              <img
                src="https://img.logoipsum.com/243.svg"
                className={`overflow-hidden transition-all ${
                  expanded ? "w-32" : "w-0"
                }`}
                alt=""
              />
              <div className={`${expanded ? "" : "block w-full"}`}>
                <button
                  onClick={() => setExpanded((curr: boolean) => !curr)}
                  className={`rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100 ${
                    expanded ? "" : "w-full"
                  }`}
                >
                  {expanded ? (
                    <div>&#60;</div>
                  ) : (
                    <div className="w-full">&#62;</div>
                  )}
                </button>
              </div>
            </div>
            <ul className="flex-1 px-3 overflow-auto">{children}</ul>
            <div className="flex border-t p-3">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=T+G"
                alt=""
                className="h-10 w-10 rounded-md"
              />
              <div
                className={`
                flex items-center justify-between
                overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}
            `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">Tomas Gir</h4>
                  <span className="text-xs text-gray-600">
                    tomas.gir@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default function MakeSidebar({ content }: { content: ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  // Desktop Sidebar
  return (
    <>
      <Sidebar expanded={expanded} setExpanded={setExpanded}>
        {navBarItems.map((item, index) => (
          <SidebarItem key={index} expanded={expanded} {...item} />
        ))}
      </Sidebar>

      <div
        className={`h-screen transition-all p-[24px] -z-10 ${
          expanded ? "sm:ml-64" : "ml-20"
        }`}
      >
        {content}
      </div>
    </>
  );
}
