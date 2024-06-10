import { useDispatch, useSelector } from "react-redux";
import { setFirstName } from "../../state/slices/tutorSlice";
import { setLastName } from "../../state/slices/tutorSlice";


function NameCard(props) {
    const dispatch = useDispatch()
    const tutorData = useSelector(state => state.tutorData)


    //taking firstname input from user
    const handleFirstNameChange = (e) => {
        dispatch(setFirstName(e.target.value))
    }

    //taking lastname input from user
    const handleLastNameChange = (e) => {
        dispatch(setLastName(e.target.value))
    }

    return (
        <div className="m-auto w-[80%] md:w-[50%] bg-lightg space-x-2 p-[13px] rounded-xl flex items-center">
            <div className="flex flex-col w-[50%]">
                <label className="block text-[#000] text-sm font-semibold mb-2">First Name</label>
                <input
                    onChange={handleFirstNameChange}
                    minLength="3"
                    maxLength="30"
                    className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                    type="text"
                    placeholder="First Name"
                    value={tutorData.firstname}
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
                    placeholder="Last Name"
                    value={tutorData.lastname}
                />
            </div>

        </div>
    );
}

export default NameCard;