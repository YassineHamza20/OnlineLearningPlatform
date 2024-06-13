import { useSelector } from "react-redux";



function Profile(props) {

    const info = useSelector(state => state.adminData.admin)
    

    return (
            <div className="max-w-md mx-auto mt-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex justify-center items-center py-4 bg-lightg">
                    <img
                    className="w-28 h-28 rounded-full border-4 border-gray-200"
                    src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
                    alt="Admin Avatar"
                    />
                </div>
                <div className="px-6 py-4">
                    <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">Email</span>
                        {/* <span className="text-gray-600">{info.email}</span> */}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">First Name</span>
                        <span className="text-gray-600">{info.firstname}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">Last Name</span>
                        <span className="text-gray-600">{info.lastname}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">Phone Number</span>
                        <span className="text-gray-600">{info.tel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">CIN</span>
                        <span className="text-gray-600">{info.CIN}</span>
                    </div>
                    </div>
                </div>
            </div>

    );
}

export default Profile;