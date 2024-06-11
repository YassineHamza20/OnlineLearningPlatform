import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import EmptyChat from "../../../components/LinguaBuddy/EmptyChat";
import { useSelector } from "react-redux";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import VoiceMessage from "../../../components/LinguaBuddy/VoiceMessage";


const LinguaBuddy = () => {
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 
    const learnerPfp = useSelector(state=> state.userData.pic)
    const tutorPfp = useSelector(state => state.tutorData.displayableImage)

    const messagesEndRef = useRef(null);



    const [loading, setLoading] = useState(false)
    const [topic, setTopic] = useState('')
    const [language, setLanguage] = useState('')
    const [text, setText] = useState('')
    const [messagesArray, setMessagesArray] = useState([])

    const handleChange = (e) => {
        setText(e.target.value)
    }


    //api call to get ai response
    const apiCall = (array) => {
        return new Promise(async (resolve, reject) => {
            setLoading(true);
            try {
                const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/user/ChatBot', {
                    data: { 
                        topic: topic,
                        language: language,
                        messages: array
                    } 
                }
            );
                console.log("response", response.data);
    
                // Using functional update to ensure latest state
                setMessagesArray(prevMessages => [...prevMessages, response.data.message]);
                setLoading(false);
                resolve('AI answered');
            } catch (err) {
                console.log(err);
                setLoading(false);
                reject('AI Failed');
            }
        });
    };
    
    //contact ai upon sending texts
    const handleSendText = async (e) => {
        e.preventDefault()
        if (text) {
            console.log("text: ", text);
    
            // Using functional update to ensure latest state
            setMessagesArray(prevMessages => {
                const updatedMessages = [...prevMessages, text];
                apiCall(updatedMessages).catch(console.log);
                return updatedMessages;
            });
    
            setText(''); // Clear the input after sending
        }
    };
    
    //after selecting topic and language, we contact ai via server
    useEffect(() => {
        async function fetchAiText() {
            try {
                const response = await apiCall([]);
            } catch (error) {
                console.log(error);
            }
        }
        if (language && topic && messagesArray.length === 0) {
            fetchAiText();
        }
    }, [language, topic]);

    //takes focus to the last message sent 
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messagesArray, loading]);

    return (
        <form onSubmit={handleSendText} className={`flex-1 h-[90%] p-2 lg:p-10 justify-between flex flex-col ${path ==="/landingpage/LinguaBuddy"? "bg-backg" : "bg-white"}`}>
            <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                {
                    topic && language?
                    messagesArray.map((message, key) => (
                        <div key={key}>
                            <div className={`flex items-end ${key%2 ===0? '' : 'justify-end'}`}>
                                <div className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${key%2 ===0? 'order-2 items-start' : 'order-1 items-end'}`}>
                                    <div>
                                        <span className={`px-4 py-3 rounded-xl inline-block ${key%2 ===0? 'rounded-bl-none bg-gray-100 text-gray-600' : 'rounded-br-none bg-button2 text-white'}`} dangerouslySetInnerHTML={{ __html: message }} />
                                    </div>
                                </div>
                                <img 
                                src={key%2 ===0? 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png' : (firstSegment ==="learner"? learnerPfp : tutorPfp)} alt="" className={`w-6 h-6 rounded-full ${key%2 ===0? 'order-1' : 'order-2'}`} />
                            </div>
                        </div>
                    ))
                    :
                    <EmptyChat
                    setTopic={setTopic}
                    setLanguage={setLanguage}
                    topic={topic}
                    language={language}
                    ></EmptyChat>

                }
                    {
                        loading?
                        <div className="flex items-end">
                            <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
                                <div><img src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif" alt="..." className="w-16 ml-6 " /></div>
                            </div>
                        </div>
                        :
                        null
                    }
                <div ref={messagesEndRef} />
            </div>
            {
                path !=="/landingpage/LinguaBuddy"?
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">
                        <div className="absolute left-2 items-center inset-y-0 hidden sm:flex">
                            {
                                !(messagesArray.length ===0 || (messagesArray.length-1)%2 ===1 || !topic || !language)?
                                <VoiceMessage setText={setText}></VoiceMessage>
                                :
                                null
                            }
                        </div>
                        <input
                            type="text"
                            placeholder="Say something..."
                            autoComplete="off"
                            autoFocus={true}
                            onChange={handleChange}
                            value={text}
                            disabled={messagesArray.length ===0 || (messagesArray.length-1)%2 ===1 || !topic || !language}//disabled if last text was from user not the chatbot
                            className={`text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 ${!(messagesArray.length ===0 || (messagesArray.length-1)%2 ===1 || !topic || !language)? "pl-10" : "pl-6"} pr-16 bg-gray-100 border-2 border-gray-200 focus:border-button2 transition-colors duration-200 rounded-full py-2`}
                        />
                        <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full p-2 transition duration-200 ease-in-out text-white bg-button2 hover:bg-button2 focus:outline-none"
                            >
                            <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </form>
    );
};

export default LinguaBuddy;
