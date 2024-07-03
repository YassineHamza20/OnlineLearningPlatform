import { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/axiosInterceptor";


function PurchaseHistory(props) {
    const [history, setHistory] = useState([])

    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/purchaseHistory`)
          setHistory(response.data)
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()
    }, [])

    return (
        <div className="mt-4 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Purchase history</h3>
        </div>
          <div className="w-full overflow-x-auto ">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  {/* <th className="px-4 py-3">ID</th> */}
                  <th className="px-4 py-3">Learner</th>
                  <th className="px-4 py-3">Cost</th>
                  <th className="px-4 py-3">Payment date</th>
                  <th className="px-4 py-3">Expiration date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {
                  history.map((item, index) =>{
                    return <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                    
                    {/* <td className="px-4 py-3 text-sm">{item.SubId}</td> */}
                    <td className="px-4 py-3 text-sm">{item.firstname + " "+ item.lastname}</td>
                    <td className="px-4 py-3 text-sm">{item.cost} TND</td>
                    <td className="px-4 py-3 text-sm">{new Date(item.PayementDate).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{new Date(item.ExpirationDate).toLocaleString()}</td>
                  </tr>
                  })
                }
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default PurchaseHistory;