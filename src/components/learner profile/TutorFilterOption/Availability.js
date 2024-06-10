import { useRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector} from "react-redux";
import { setfilterOptions } from "../../../state/slices/userSlice";

function Availability(props) {

    const dispatch = useDispatch()
    const filterOptions = useSelector(state => state.userData.filterOptions)

    const datepickerRef = useRef(null)
    
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };

    const handleDateChange = (date) => {
        console.log("date:" ,date);
        const selectedDate = new Date(date)

        if (selectedDate) {
            //extracting the values from that day object to construct the wanted format 
            //the format : yyyy-MM-dd hh:mm:ss
            const year = selectedDate.getFullYear()
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month cause getMonth()'s index is zero-based 
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const hours = String(selectedDate.getHours()).padStart(2, '0');
            const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
            const seconds = String(selectedDate.getSeconds()).padStart(2, '0');

            const result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    
            dispatch(setfilterOptions({
                type:"availability",
                value: result
            }))
            props.setDate(date)
            const data = {...filterOptions, availability:result}
            //getting data from server
            props.fetchData(data)
        }
    }
    


    return (
        <DatePicker 
        ref={datepickerRef}
        selected={props.date} 
        showIcon
        className="text-center p-2 rounded-lg cursor-pointer border border-darkg text-darkg" 
        onChange={handleDateChange} 
        dateFormat="yyyy-MM-dd hh:mm"
        showTimeSelect
        timeIntervals={15}
        timeFormat="hh:mm"
        minDate={new Date()}
        placeholderText={'Please select a date'} 
        showYearDropdown
        filterTime={filterPassedTime}
        />
    );
}

export default Availability;