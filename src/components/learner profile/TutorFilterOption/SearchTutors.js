import { useDispatch, useSelector } from "react-redux";
import { setfilterOptions } from "../../../state/slices/userSlice";
import { useState } from "react";
function SearchTutors(props) {

    const [name, setName] = useState('')

    const filterOptions = useSelector(state => state.userData.filterOptions)
    const dispatch = useDispatch()


    //using local object to showcase the input changing, but using the redux object to send server requests 
    const handleNameChange = (e) => {
        //if the user resets the field we get the data again with no name
        if(!e.target.value && filterOptions.name) {
            dispatch(setfilterOptions({
                type :"name",
                value: e.target.value
            }))
            const data = {...filterOptions, name:""}
            //getting data from server
            props.fetchData(data)
        }

        setName(e.target.value)
        
    }

    //only registring the name when the user submits
    const handleSearch = (e) => {
        
        e.preventDefault()
        console.log("Searching");
        if(name) {
            dispatch(setfilterOptions({
                type :"name",
                value: name
            }))
            const data = {...filterOptions, name:name}
            //getting data from server
            props.fetchData(data)
        }
        
    }

    return (
        <form onSubmit={handleSearch} className="w-full flex mb-5 space-x-2 items-center">
            <input
            type="search"
            onChange={handleNameChange}
            value={name}
            
            placeholder="Search for tutor..."
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-elements transition-colors duration-300"
            />
            <button className="px-4 py-2 rounded-xl bg-button2 transition-colors duration-300 text-white border border-button2 hover:bg-lightButton2 hover:text-button2">Search</button>
        </form>
    );
}

export default SearchTutors;