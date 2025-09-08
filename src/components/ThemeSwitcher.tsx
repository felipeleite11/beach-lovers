"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="transition-all rounded-lg bg-gray-200 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 text-black dark:text-white cursor-pointer w-10 h-10 flex justify-center items-center"
    >
      {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
