import axios from "axios";
import { useState } from "react";

const CreateEmailList = () => {
  const [emailList, setEmailList] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Convert the string into an array of trimmed email addresses
    const emails = emailList
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== ""); // Remove empty strings

      console.log(name, emails);

    try {
      const response = await axios.post("https://automatic-email-sender-server.vercel.app/api/email-lists", {
        name,
        emails,
      });

      if (response.status === 200) {
        setSuccess("Email list uploaded successfully!");
        setName("");
        setEmailList("");
      }
    } catch (err) {
      setError("Failed to upload email list. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className=" w-2/3 mx-auto p-6 bg-gray-700 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Upload Email List
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              List Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter a name for the email list"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Emails (separate by commas)
            </label>
            <textarea
              value={emailList}
              onChange={(e) => setEmailList(e.target.value)}
              className="w-full h-32 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter emails separated by commas"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Emails"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmailList;
