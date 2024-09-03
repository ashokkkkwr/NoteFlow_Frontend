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

                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg" alt="" className='h-10 w-10'/>
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