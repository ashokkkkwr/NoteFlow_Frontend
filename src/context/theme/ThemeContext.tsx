import { useEffect,useState } from "react";
import { createContext } from "react"
import { ThemeEnum } from "@type/global.types";

interface ThemeContextType{
    theme:ThemeEnum
    setTheme:(theme:ThemeEnum)=>void
}
const initialThemeContext:ThemeContextType={
    theme:ThemeEnum.light,
    setTheme:()=>{
        return
    }
}
const ThemeContext = createContext<ThemeContextType>(initialThemeContext)
export default ThemeContext