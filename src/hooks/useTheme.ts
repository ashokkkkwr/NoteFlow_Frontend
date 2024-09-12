import { LanguageType } from "@type/global.types";
import { useContext } from "react";
import ThemeContext from "@context/theme/ThemeContext";
const useTheme = ()=>{
    const contextValue = useContext(ThemeContext)
    const languageType={
        theme:contextValue.theme,
        setTheme:contextValue.setTheme
    }
    return languageType
}
export default useTheme