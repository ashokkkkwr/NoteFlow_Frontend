import { createContext } from "react";
import { LanguageEnum } from "@type/global.types";
interface LanguageContextType{
  
       lang: LanguageEnum;
        setLang:(lang:LanguageEnum) =>void
    
}
const initalLanguageContext:LanguageContextType={
    lang:LanguageEnum.en,
    setLang:()=>{
        return;
    }
}
const LanguageContext = createContext<LanguageContextType>(initalLanguageContext)
export default LanguageContext