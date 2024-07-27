import useLang from '@hooks/useLang'
import { LanguageEnum } from '@type/global.types'
const LanguageToggle = ()=>{
    const {lang,setLang}=useLang()
    const switchLanguage=()=>{
        setLang(lang===LanguageEnum.en?LanguageEnum.ne:LanguageEnum.en)

    }
    return(
        <div className="bg-blue-500 text-white py-2 px-4 rounded  " onClick={switchLanguage}>
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