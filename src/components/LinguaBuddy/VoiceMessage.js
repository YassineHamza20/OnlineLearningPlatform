import { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

function VoiceMessage({ setText }) {
    const [listening, setListening] = useState(false);
    const recognition = useRef(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please use Google Chrome.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition.current = new SpeechRecognition();
        recognition.current.lang = 'en-US';
        recognition.current.interimResults = false;

        recognition.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
            setListening(false);
        };

        recognition.current.onerror = (event) => {
            console.error('Speech recognition error', event);
            alert('Speech recognition error: ' + event.error);
            setListening(false);
        };

    }, [setText]);

    const checkMicrophoneAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the stream after the test
            return true;
        } catch (err) {
            console.error('Microphone is not accessible', err);
            alert('Please allow access to the microphone and ensure it is connected properly.');
            return false;
        }
    };

    const toggleListening = async () => {
        const hasAccess = await checkMicrophoneAccess();
        if (!hasAccess) return;

        if (listening) {
            recognition.current.stop();
        } else {
            recognition.current.start();
        }
        setListening(!listening);
    };

    return (
        <div>
            <button type="button" onClick={toggleListening} className="inline-flex items-center justify-center rounded-full p-2 transition duration-200 ease-in-out text-white bg-button2 hover:bg-button2 focus:outline-none">
                {listening ? <FaMicrophoneSlash className="text-white" /> : <FaMicrophone className="text-white" />}
            </button>
        </div>
    );
}

export default VoiceMessage;
