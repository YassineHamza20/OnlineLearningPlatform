import { useState } from 'react'
import axiosInstance from '../../interceptors/axiosInterceptor'
import Loading from '../Global/Loading'
import { PiCellSignalLowDuotone } from "react-icons/pi";
import { PiCellSignalMediumDuotone } from "react-icons/pi";
import { PiCellSignalHighDuotone } from "react-icons/pi";
import {useSelector, useDispatch} from 'react-redux'
import { setWifiQuality } from '../../state/slices/tutorSlice';


function FourthPhase() {
    const [isTesting, setIsTesting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const wifiQuality = useSelector(state => state.tutorData.wifiQuality)
    const tutorData = useSelector(state => state.tutorData)
    const dispatch = useDispatch()

    const handleSpeedTest = async (e) => {
        e.preventDefault();
        setIsTesting(true);
        setIsLoading(true);
    
        axiosInstance.post(
            'https://onlinelearningplatform-d9w2.onrender.com/speedTest',
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                }
            }
        )
        .then(response => {
            console.log('response', response);
            dispatch(setWifiQuality(response.data))
        })
        .catch(err => console.log(err))
        .finally(() => {
            setIsLoading(false);
        });
    }
    
    //the displayable result based on the connection quality
    const wifiStatus = {
            Bad: <>
                    <div className="m-auto">
                        <PiCellSignalLowDuotone color="#c03b3a" size="60"></PiCellSignalLowDuotone>
                    </div>
                    <span className="font-bold text-errortext text-lg text-center">
                        {wifiQuality.connectionQuality} Connection Quality
                    </span>
                    <span className="text-darkg text-center">
                        Your connection {wifiQuality.latency} ms is not optimal. Ensure a stable connection for seamless teaching experience.
                    </span>
            </>,
            Medium: <>
                        <div className="m-auto">
                            <PiCellSignalMediumDuotone color="#FFD93D" size="60"></PiCellSignalMediumDuotone>
                        </div>
                        <span className="font-bold text-[#FFD93D] text-lg text-center">
                            {wifiQuality.connectionQuality} Connection Quality
                        </span>
                        <span className="text-darkg text-center">
                            Your connection {wifiQuality.latency} ms is moderate. Consider optimizing it for a better teaching experience.
                        </span>
            </>,
            Good: <>
                    <div className="m-auto">
                        <PiCellSignalHighDuotone color="#6BCB77" size="60"></PiCellSignalHighDuotone>
                    </div>
                    <span className="font-bold text-[#6BCB77] text-lg text-center">
                        {wifiQuality.connectionQuality} Connection Quality
                    </span>
                    <span className="text-darkg text-center">
                        Your connection {wifiQuality.latency} ms is efficient. Enjoy a smooth teaching experience!
                    </span>
            </>
            

        }
    

    return (
        <div className="w-full h-[80%] space-y-2 py-3 overflow-y-auto"> 
            <div className="w-[80%] md:w-[50%] h-auto flex-col m-auto flex space-y-3 p-[13px] bg-lightg rounded-xl">    
                {
                    !isTesting?
                        <>
                            <span className="text-black text-lg font-bold text-center">
                                Let's test your connection
                            </span>
                            <span className="text-black text-center">
                                Our students learn best when technology is working smoothly.
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col justify-center items-center">
                                    <img src="/wifi.png" className="h-32 w-32" alt="wifi"></img>
                                    <span className="text-darkg text-sm">High-speed internet connection</span>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <img src="/webcam.png" className="h-32 w-32" alt="webcam"></img>
                                    <span className="text-darkg text-sm">Built-in or external webcam</span>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <img src="/lighting.png" className="h-32 w-32" alt="lighting"></img>
                                    <span className="text-darkg text-sm">Good lighting</span>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <img src="/radio.png" className="h-32 w-32" alt="radio"></img>
                                    <span className="text-darkg text-sm">Microphone or headset</span>
                                </div>
                            </div>
                            <span className="text-black text-center">
                                Start the test when you are ready with the setup you will use to tutor.
                            </span>
                            <button type="button" onClick={handleSpeedTest} className=" bg-elements m-auto text-white px-4 py-2 rounded-lg">
                                Start Testing
                            </button>
                        </>
                    :
                        isLoading || tutorData.isLoading?
                        <Loading></Loading>
                        :
                        wifiStatus[wifiQuality.connectionQuality]
                }
                <button></button>
            </div>
        </div>
    );
}

export default FourthPhase;