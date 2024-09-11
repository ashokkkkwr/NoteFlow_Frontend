import {useEffect,useState} from "react"
import ThemeContext from "./ThemeContext"
import { ThemeEnum } from "@type/global.types"

const ThemeState = (props:any)=>{
    const [theme,setTheme] = useState(
        (localStorage.getItem("theme")as ThemeEnum)|| ThemeEnum.light)
        useEffect(()=>{
            localStorage.setItem("theme",theme);
        },[theme])
        return(
            <ThemeContext.Provider value={{theme,setTheme}}>
                {props.children}
            </ThemeContext.Provider>
        )
    
}
export default ThemeState