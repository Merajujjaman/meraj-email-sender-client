import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateSmtp = () => {
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
    host: "smtp.gmail.com",
    port: 587,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim values in formData before submitting
    const trimmedData = {
      ...formData,
      user: formData.user.trim(),
      pass: formData.pass.trim(),
      host: formData.host.trim(),
    };

    try {
      const result = await axios.post("https://automatic-email-sender-server.vercel.app/api/smtp", trimmedData);
      if (result.data.success) {
        toast.success("SMTP settings saved successfully!");
        setFormData({ user: "", pass: "", host: "smtp.gmail.com", port: 587 });
      }
    } catch (error) {
      console.log("Error saving SMTP settings:", error);
      toast.error(error?.response?.data?.message || `Something went wrong: ${error.message}`);
    }
  };

  return (
    <div className="w-2/3 bg-gray-700 flex justify-center mt-8 rounded-lg">
      <form onSubmit={handleSubmit} className="w-full bg-gray-700 p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center text-white">SMTP Configuration</h2>

        {/* Email user */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
            Email Address
          </label>
          <input
            type="email"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email address"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pass">
            App Password
          </label>
          <input
            type="password"
            id="pass"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email app password"
          />
        </div>

        {/* SMTP Host */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="host">
            SMTP Host (Default: smtp.gmail.com)
          </label>
          <input
            type="text"
            id="host"
            name="host"
            value={formData.host}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Port */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="port">
            Port (Default: 587 for STARTTLS)
          </label>
          <input
            type="number"
            id="port"
            name="port"
            value={formData.port}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save SMTP Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSmtp;
