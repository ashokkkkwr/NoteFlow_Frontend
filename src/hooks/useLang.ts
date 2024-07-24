import { LanguageType } from "@type/global.types";
import { useContext } from "react";
import LanguageContext from "@context/Language/LanguageContext";
const useLang = ()=>{
    const contextValue = useContext(LanguageContext)
    const languageType={
        lang:contextValue.lang,
        setLang:contextValue.setLang
    }
    return languageType
}
export default useLang