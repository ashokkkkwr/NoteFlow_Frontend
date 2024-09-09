import useLang from '@hooks/useLang';
import { LanguageEnum } from '@type/global.types';

const LanguageToggle = () => {
    const { lang, setLang } = useLang();

    const switchLanguage = () => {
        setLang(lang === LanguageEnum.en ? LanguageEnum.ne : LanguageEnum.en);
    };

    return (
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
            <button
                onClick={switchLanguage}
                aria-label="Toggle Language"
                className="bg-blue-500 text-white p-2 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                {lang === LanguageEnum.en ? (
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
                        alt="English"
                        className="h-6 w-6"
                    />
                ) : (
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1280px-Flag_of_Nepal.svg.png"
                        alt="Nepali"
                        className="h-6 w-6"
                    />
                )}
            </button>
            <div className='flex flex-col'>
            <span className="text-lg font-poppins">Language Setting</span>
            <span className='text-sm'>Click to change the language...</span>
            </div>
            
        </div>
    );
};

export default LanguageToggle;
