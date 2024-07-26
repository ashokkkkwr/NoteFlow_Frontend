import useLang from '@hooks/useLang'
import { LanguageEnum } from '@type/global.types'
const LanguageToggle = ()=>{
    const {lang,setLang}=useLang()
    const switchLanguage=()=>{
        setLang(lang===LanguageEnum.en?LanguageEnum.ne:LanguageEnum.en)

    }
    return(
        <div  onClick={switchLanguage}>
            {lang==='en'?(<span>
                en
            </span>):(
                <span>
                    ne
                </span>
            )}
        </div>

    )
}
export default LanguageToggle