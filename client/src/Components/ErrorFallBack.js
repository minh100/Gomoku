import background from '../Images/404BG.svg';
import {useHistory} from 'react-router-dom';

export const ErrorFallBack = ({ error, onReset }) => {
    
    const history = useHistory();

    return (
        <>
            <div class="bg-gray-700 relative overflow-hidden h-screen">
                <img src={background} class="absolute h-full w-full object-cover" />
                <div class="inset-0 bg-black opacity-25 absolute">
                </div>
                <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                    <div class="w-full font-mono flex flex-col items-center relative z-10">
                        <h1 class="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                            Something Went Wrong
                        </h1>
                        <button class="font-extrabold text-5xl my-44 text-white animate-bounce" onClick={() => history.push('/login')}>
                            Click Me Or Refresh
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}