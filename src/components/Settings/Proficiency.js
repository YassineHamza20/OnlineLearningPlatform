import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react"
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";


function Proficiency(props) {

    //fetch proficiency from the store
    const userProficiency = useSelector((state) => state.userData.proficiency)

    const [editing, setEditing] = useState(false)
    
    
    const [proficiency, setProficiency] = useState("")
    
    const handleClick = () => {
        if(!editing ){
            setEditing(true)
        }
    }



    const handleSave = async () => {
        if(editing) {
            if ( userProficiency && userProficiency !== proficiency) {
                try {
                await props.modifyCall(proficiency, 'profic')
                } catch (error) {
                    console.log(error);
                }

            }
            setEditing(false)
        }
    }
    
     //saving the second step selection
     const handleRadioButtonSelection = (title) => {
         setProficiency(title)
     }
 
     const handleChecked = (title) => {
         if(proficiency !== "") {
             if(proficiency === title) {
                 return true
             }else {
                 return false
             }
         }
         else {
             return false
         }
     }

    const handleInput = () => {
        const radio_title = [
            ["None", "I'm still learning English and know only a few words and phrases. Understanding and responding in conversations is a challenge for me."],
            ["Basic", "While I know some basic English, I often need help understanding and responding in conversations. Sometimes, I have to look up words."],
            ["Moderate", "I can discuss familiar topics and share my opinions and plans. Despite making occasional mistakes, I can usually communicate effectively."],
            ["Advanced", "I can express thoughts, feelings, and opinions without much preparation. People generally understand me, and I can correct myself if necessary."],
            ["Fluent", "Comfortable discussing complex topics, I can express myself with subtlety and nuance, fostering meaningful conversations."]
        ]
        const radioArray =radio_title.map((informations, index) => {
            return <div key={index} className="flex flex-wrap gap-2 self-start">
            <label  className="flex items-center space-x-2 h-7" onClick={(e) => { if (!editing) e.preventDefault(); }}>
                <div className={`rounded-full w-6 h-6  flex flex-shrink-0 justify-center items-center relative`} >
                    <input 
                    disabled={!editing} 
                    onChange={() => handleRadioButtonSelection(informations[0])} 
                    checked={handleChecked(informations[0])} 
                    aria-labelledby="label1" 
                    type="radio" 
                    name="radio" 
                    className={`${!editing ? 'cursor-not-allowed' : 'cursor-pointer'} checkbox border-button appearance-none  focus:outline-none border-2 rounded-full absolute cursor-pointer w-full h-full checked:border-none`}/>
                    <div className="check-icon hidden border-8 border-button rounded-full w-full h-full z-1"></div>
                </div>
                <span className="cursor-pointer text-sm">{index} - {informations[0]}</span>
                <div className="myDIV flex justify-center items-center">
                    <IoMdInformationCircleOutline 
                    color="grey" 
                    size="20" 
                    ></IoMdInformationCircleOutline>
                </div>
                <div className={`hide p-2 w-[45%] sm:1/3 md:w-1/3 lg:w-1/3 xl:1/3 z-10 text-left rounded-md bg-black text-white text-xs`}>
                        {informations[1]}
                </div>
            </label>
        </div>
        })

        return radioArray
    }
    
    //set the value of proficiency to the actual value of the user 

    useEffect(() => {
        if(userProficiency) {
            setProficiency(userProficiency)
        }
    }, [userProficiency])

    console.log("proficiency:", proficiency);
    return (
        <div onClick={handleClick} className="border-b px-2 hover:bg-lightg cursor-pointer justify-between  items-start flex border-lightg py-2">
            <span className="text-black font-bold w-40">
                {props.title}
            </span>
            {
                !editing?
                <>
                    <div className={`flex flex-col items-center justify-center w-[50%] ${!editing? "opacity-65" : "opacity-100"}`}>
                        {
                            handleInput()
                            
                        }
                    </div>
                    <div className="px-4 py-2 w-7">
                        <MdEdit  className="text-black" size="17"></MdEdit>

                    </div>
                </>
                :
                <>
                    <div className="flex flex-col items-center justify-center w-[50%] ">
                        {
                            handleInput()
                            
                        }
                    </div>
                    <div onClick={handleSave} className="px-4 py-2 rounded-md bg-elements text-white"> Save</div>
                </> 
            }
           
        </div>
    );
}

export default Proficiency;