import { useEffect } from "react";
import CreateAdmin from "../../components/Admin/CreateAdmin";
import DeleteLearner from "../../components/Admin/DeleteLearner";
import DeleteTutor from "../../components/Admin/DeleteTutor";
import DeletionPanel from "../../components/Admin/DeletionPanel";
import InformationalCards from "../../components/Admin/InformationalCards";
import NavBar from "../../components/Admin/NavBar";
import Profile from "../../components/Admin/Profile";
import PurchaseHistory from "../../components/Admin/PurchaseHistory";
import SideBar from "../../components/Admin/SideBar";
import { useDispatch} from 'react-redux'
import { setAdmin } from "../../state/slices/adminSlice";
import axiosInstance from "../../interceptors/axiosInterceptor";


function Admin(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/AdminInfo`)
            console.log(response.data);
            dispatch(setAdmin(response.data.result[0]))
        } catch (error) {
            console.log(error)
        }
    }
    fetchData()
}, [])

   //knowing whether it's a tutor or learner signing up
   const path = window.location.pathname;

  const handleBody = () => {
    if(path === "/admin/Dashboard"){
      return <>
         <InformationalCards></InformationalCards>
            <div className="grid grid-cols-1 lg:grid-cols-1 p-4 gap-4">
              <DeletionPanel></DeletionPanel>
              <DeleteLearner></DeleteLearner>
              <DeleteTutor></DeleteTutor>
              <PurchaseHistory></PurchaseHistory>
            </div>
            
      </>
    }else if(path ==="/admin/Profile"){
        return <Profile></Profile>

    }else if(path ==="/admin/CreateAdmin"){
      return <CreateAdmin>
      </CreateAdmin>
    }
  }
  
    return (
        <div x-data="setup()">
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-backg dark:bg-gray-700 text-black dark:text-white">
          <NavBar></NavBar>
          <SideBar></SideBar>
          <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
            {
              handleBody()
            }
          </div>
        </div>
      </div>    
    
    );
}

export default Admin;