import { useState } from 'react';
import axiosInstance from '../../interceptors/axiosInterceptor';
import ReactLoading from 'react-loading';

function CreateAdmin(props) {
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confPass: '',
        phoneNumber: '',
        CIN:''
      });

      const [error, setError] = useState(false)
      const [success, setSuccess] = useState(false)

      const [loading, setLoading] = useState(false)
      
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submitted:', formData);
        try {
            setError(false)
            setSuccess(false)
            setLoading(true)
            const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/signup`, {
                email: formData.email,
                password: formData.password,
                firstname: formData.firstname, 
                lastname: formData.lastname,
                tel: formData.phoneNumber,
                CIN: formData.CIN
            })
            setLoading(false)
            setSuccess(true)
            setFormData({
                email: '',
                firstname: '',
                lastname: '',
                password: '',
                confPass: '',
                phoneNumber: '',
                CIN: ''
              })
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(true)
        }
      }

      console.log("formdata:" ,formData);
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-5">
      <h2 className="text-2xl font-bold mb-3 text-gray-800">Create Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-elements"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder='First Name'
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-elements"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder='Last Name'
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-elements"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            minLength="8"
            maxLength="30"
            placeholder='Password'
            pattern="^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$" // assuring the password contains at least one uppercase letter and one digit
            title={`${formData.password.length<8? `Contains at least 8 characters (currently at ${formData.password.length} characters), `:""}Contains at least an UpperCase letter and a digit`}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-elements"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confPass"
            value={formData.confPass}
            pattern={formData.password}
            onChange={handleChange}
            placeholder='Password'
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-elements"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            minLength={8}
            maxLength={8}
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder='Phone Number'
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-elements"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">CIN</label>
          <input
            type="number"
            minLength={8}
            maxLength={8}
            name="CIN"
            value={formData.CIN}
            onChange={handleChange}
            placeholder='CIN'
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-elements"
            required
          />
        </div>
        {
            success?
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Success:</strong>
                <span className="block sm:inline"> An admin has been created successfully.</span>
            </div>

            :
            null
        }

        {
            error?
            <div className="bg-red-100 border border-red-400 text-errortext px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> Please use a unique email address.</span>
            </div>   
            :
            null   
        }
        {
            loading?
            <div className="w-full items-center justify-center flex">
                <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
            </div>
            :
            <button
            type="submit"
            className="w-full bg-elements text-white py-2 px-4 rounded-lg hover:shadow-md focus:outline-none focus:ring-2 focus:ring-elements focus:ring-opacity-50"
            >
            Create
            </button>


        }
      </form>
    </div>
    );
}

export default CreateAdmin;