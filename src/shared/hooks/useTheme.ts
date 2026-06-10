import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const useTheme = () => {
  return useContext(ThemeContext);
};
//vd sử dụng
// const { theme, toggleTheme } = useTheme();

// <button onClick={toggleTheme}>
//   {theme === "light" ? "🌙" : "☀️"}
// </button>