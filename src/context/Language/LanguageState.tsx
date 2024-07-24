import {useEffect,useState} from "react"
import LanguageContext from "./LanguageContext"
import { LanguageEnum } from "@type/global.types"

const LanguageState = (props:any)=>{
    const[lang,setLang] = useState(
        (localStorage.getItem("lang")as LanguageEnum)|| LanguageEnum.en)
    useEffect(()=>{
        localStorage.setItem("lang",lang);
    },[lang]);
    return(
        <LanguageContext.Provider value={{lang,setLang}}>
        {props.children}
        </LanguageContext.Provider>
    )
}
export default LanguageState;