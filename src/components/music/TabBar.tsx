import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Library, Home, Compass } from "lucide-react";
import { spring } from "@/lib/motion";
import { Haptics } from "@/lib/haptics";

const tabs = [
  { to: "/", Icon: Home },
  { to: "/browse", Icon: Compass },
  { to: "/search", Icon: Search },
  { to: "/library", Icon: Library },
] as const;

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="pointer-events-auto fixed inset-x-0 bottom-0 z-40 glass-strong border-t border-border/40">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-4 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
        {tabs.map(({ to, Icon }) => {
          const active = pathname === to;
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                onClick={() => {
                  if (!active) {
                    Haptics.light();
                  }
                }}
                className="relative flex flex-col items-center gap-1 rounded-xl px-1 py-2"
              >
                <motion.div
                  animate={{ scale: active ? 1.18 : 1, y: active ? -2 : 0 }}
                  transition={spring.soft}
                  className="relative"
                >
                  {active && (
                    <motion.span
                      layoutId="tab-dot"
                      transition={spring.gentle}
                      className="absolute -inset-2 -z-10 rounded-full bg-accent/20 blur-md"
                    />
                  )}
                  <Icon
                    strokeWidth={active ? 2.6 : 2}
                    className={`h-[24px] w-[24px] transition-colors duration-500 ease-out ${
                      active ? "text-accent" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
