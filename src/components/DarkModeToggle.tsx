import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} className="btn btn-ghost">
      {dark ? "Light" : "Dark"}
    </button>
  );
}
