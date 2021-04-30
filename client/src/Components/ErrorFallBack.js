import background from '../Images/404BG.svg';
import {useHistory} from 'react-router-dom';

export const ErrorFallBack = ({ error, onReset }) => {
    
    const history = useHistory();

    return (
        <>
            <div className="bg-white relative overflow-hidden h-screen">
                <img src={background} className="absolute h-full w-full object-cover" alt="bg"/>
                <div >
                </div>
                <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                    <div className="w-full font-mono flex flex-col items-center relative z-10">
                        <h1 className="font-extrabold text-6xl text-center text-purple-600 leading-tight mt-8">
                            Something Went Wrong...
                        </h1>
                        <button className="font-extrabold text-5xl my-28 text-purple-600 animate-bounce" onClick={() => history.push('/login')}>
                            Click Me Or Refresh
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}