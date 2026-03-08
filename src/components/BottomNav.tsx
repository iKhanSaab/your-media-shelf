import { NavLink, useLocation } from "react-router-dom";
import { Home, Library, Plus, BarChart3, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/shelf", icon: Library, label: "Shelf" },
  { path: "/add", icon: Plus, label: "Add" },
  { path: "/stats", icon: BarChart3, label: "Stats" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const isAdd = path === "/add";
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors",
                isAdd && "relative -mt-4",
                isActive && !isAdd && "text-primary",
                !isActive && !isAdd && "text-muted-foreground"
              )}
            >
              {isAdd ? (
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Icon size={22} />
                </div>
              ) : (
                <>
                  <Icon size={20} />
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
