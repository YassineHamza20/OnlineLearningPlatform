import { useEffect, useState } from "react";

function Success_popup(props) {
    //controlling the visibility or the success popup
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Show error message if error exists
        setIsVisible(!!props.message);
        
        //remove the popup after a duration of time
        const timeoutId = setTimeout(() => {
            setIsVisible(false)
            
        }, 2500)

        // Clear the timeout on component unmount to avoid memory leaks
        return () => clearTimeout(timeoutId);
    }, [props.message]);
    return (
        <div
            className={`fixed bottom-0 flex border-elements border-[1px] justify-center items-center left-1/2 transform -translate-x-1/2 bg-successbg text-white p-3 text-center w-auto rounded-xl text-sm transition-transform duration-300 ${
                isVisible ? '-translate-y-6' : 'translate-y-full'}`}>
            <span className="text-elements text-sm font-bold w-full h-full">Success: {props.message}</span>
       </div> 
    );
}

export default Success_popup;