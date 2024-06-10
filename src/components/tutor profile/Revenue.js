import React, { useEffect, useState } from 'react';
import Card from '../learner profile/Card';
import axiosInstance from '../../interceptors/axiosInterceptor';

function Revenue(props) {
  const [totalRevenue, setTotalRevenue] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/tutor/Revenue`)
        setTotalRevenue(response.data.Revenue + " TND")
  
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Potential current revenue</h2>
      <div className="flex justify-center items-center w-full">
        <div className=" md:mr-4">
          <p className="text-3xl font-bold text-elements">{totalRevenue}</p>
        </div>
      </div>
    </>
  );

  return <Card content={content}></Card>;
}

export default Revenue;
