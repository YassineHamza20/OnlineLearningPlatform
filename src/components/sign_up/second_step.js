import { setFirstName, setLastName } from '../../state/slices/userSlice'
import RadioButton from './radiobutton'
import {useDispatch, useSelector} from 'react-redux'

export default function Second() {

    const dispatch = useDispatch()

    const userData = useSelector(state => state.userData)
    
    const radio_title = [
        ["None", "I'm still learning English and know only a few words and phrases. Understanding and responding in conversations is a challenge for me."],
        ["Basic", "While I know some basic English, I often need help understanding and responding in conversations. Sometimes, I have to look up words."],
        ["Moderate", "I can discuss familiar topics and share my opinions and plans. Despite making occasional mistakes, I can usually communicate effectively."],
        ["Advanced", "I can express thoughts, feelings, and opinions without much preparation. People generally understand me, and I can correct myself if necessary."],
        ["Fluent", "Comfortable discussing complex topics, I can express myself with subtlety and nuance, fostering meaningful conversations."]
    ]

    const handleFirstNameChange = (e) => {
        dispatch(setFirstName(e.target.value))
    }
    
    const handleLastNameChange = (e) => {
        dispatch(setLastName(e.target.value))
    }


    return(
        <>
            <div className="flex items-center space-x-11">
                <div className="flex flex-col w-[50%]">
                    <label className="block text-[#000] text-sm font-semibold mb-2">First Name</label>
                    <input
                        onChange={handleFirstNameChange}
                        minLength="3"
                        maxLength="30"
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                        type="text"
                        value={userData.firstname}
                        placeholder="First Name"
                    />
                </div>
                <div className="flex flex-col w-[50%]">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Last Name</label>
                    <input
                        onChange={handleLastNameChange}
                        minLength="3"
                        maxLength="30"
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                        type="text"
                        value={userData.lastname}
                        placeholder="Last Name"
                    />
                </div>

            </div>
            <hr className="h-1 w-full"></hr>

            <span className="font-bold self-start text-lg text-[#000]">
                How would you like to describe your English proficiency?
            </span>
            {
                radio_title.map((informations, index) => {
                    return <RadioButton key={index} index={index} title={informations[0]} infos= {informations[1]}></RadioButton>
                })
            }
        </>
    );
}