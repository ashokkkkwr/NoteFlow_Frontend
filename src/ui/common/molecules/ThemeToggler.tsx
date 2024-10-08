import useTheme from '@hooks/useTheme';
import { ThemeEnum } from '@type/global.types';

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();

    const switchLanguage = () => {
        setTheme(theme === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light);
    };

    return (
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
            <button
                onClick={switchLanguage}
                aria-label="Toggle Language"
                className="bg-blue-500 text-white p-2 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                {theme === ThemeEnum.light ? (
                    // <img
                    //     src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
                    //     alt="English"
                    //     className="h-6 w-6"
                    // />
                    <p>Light</p>
                ) : (
                    // <img
                    //     src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1280px-Flag_of_Nepal.svg.png"
                    //     alt="Nepali"
                    //     className="h-6 w-6"
                    // />
                    <p>dark</p>
                )}
            </button>
            <div className='flex flex-col'>
            <span className="text-lg font-poppins">Theme Setting</span>
            <span className='text-sm'>Click to change the Theme...</span>
            </div>
            
        </div>
    );
};

export default ThemeToggler;
