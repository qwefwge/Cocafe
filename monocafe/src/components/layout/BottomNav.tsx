import { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface BottomNavProps {
  items: NavItem[];
}

export function BottomNav({ items }: BottomNavProps) {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-coffee-800/5 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-coffee-600" : "text-coffee-800/40 hover:text-coffee-600/70"
              )}
            >
              <item.icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                className={cn("transition-transform", isActive && "scale-110")}
              />
              <span className={cn("text-[10px] font-medium font-sans", isActive && "font-bold")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
