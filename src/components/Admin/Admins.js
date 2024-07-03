import { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/axiosInterceptor";

function AdminList(props) {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/Getadmins`);
          setAdmins(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);

    const deleteAdmin = async (admin) => {
        console.log("adminId: ", admin.id);
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/DeleteAdminAccount`, {
                userId: admin.id
            });
            console.log(response);
            const filteredArray = admins.filter((item) => item.id !== admin.id);
            setAdmins(filteredArray);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-4 mx-4">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="relative w-full max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Admin List</h3>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">First Name</th>
                                <th className="px-4 py-3">Last Name</th>
                                <th className="px-4 py-3">Tel</th>
                                <th className="px-4 py-3">CIN</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {
                                admins.map((admin, index) => (
                                    <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                        <td className="px-4 py-3 text-sm">{admin.email}</td>
                                        <td className="px-4 py-3 text-sm">{admin.firstname}</td>
                                        <td className="px-4 py-3 text-sm">{admin.lastname}</td>
                                        <td className="px-4 py-3 text-sm">{admin.tel}</td>
                                        <td className="px-4 py-3 text-sm">{admin.CIN}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <button onClick={() => deleteAdmin(admin)} className="flex justify-center w-full text-white rounded-lg px-4 py-2 bg-errortext items-center">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminList;
