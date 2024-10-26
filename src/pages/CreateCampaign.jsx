import axios from "axios";
import { useState } from "react";
import useSmtpOptions from "../hooks/useSmtpOptions";
import useEmailListOptions from "../hooks/useEmailListOptions";
import SendingLoader from "../components/SendingLoader";

const CreateCampaign = () => {
  const [name, setName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [smtpId, setSmtpId] = useState("");
  const [emailListId, setEmailListId] = useState("");
//   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sentLoading, setSentLoading] = useState(false);

  // Fetch SMTP and Email List options using custom hooks
  const {
    smtpOptions,
    loading: smtpLoading,
    error: smtpError,
  } = useSmtpOptions();
  const {
    emailListOptions,
    loading: emailListLoading,
    error: emailListError,
  } = useEmailListOptions();
  // console.log(emailListOptions.data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSentLoading(true);
    setError(null);
    setSuccess(null);
    console.log(name, senderName, subject, message, smtpId, emailListId);

    const postData = {
      name: name.trim(),
      senderName: senderName.trim(),
      subject: subject.trim(),
      message,
      smtpId,
      emailListId,
    };

    try {
      const response = await axios.post(
        "https://automatic-email-sender-server.vercel.app/api/campaigns",
        postData
      );

      if (response.status === 200) {
        setSuccess("Campaign created successfully!");

        // Reset form fields
        setName("");
        setSubject("");
        setMessage("");
        setSmtpId("");
        setEmailListId("");
      }
    } catch (err) {
      setError("Failed to create campaign. Please try again.");
      console.log(err);
    } finally {
      setSentLoading(false);
      
    }
  };
  return (
    <div className="w-2/3 p-4 bg-gray-700 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-2 text-center text-white">
        Start Campaign
      </h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-500 text-center mb-2">{success}</p>}
      {sentLoading && <SendingLoader />} {/* Render the loader when loading is true */}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Campaign Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter campaign name"
            required
          />
        </div>
        {/* Sender Name Field */}
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sender Name
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter sender name"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter email subject"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter message content"
            required
          />
        </div>

        {/* SMTP Dropdown */}
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select SMTP
          </label>
          {smtpLoading ? (
            <p>Loading SMTP options...</p>
          ) : smtpError ? (
            <p className="text-red-500">Error loading SMTP options</p>
          ) : (
            <select
              value={smtpId}
              onChange={(e) => setSmtpId(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              required
            >
              <option value="">-- Select SMTP --</option>
              {smtpOptions &&
                smtpOptions?.map((smtp) => (
                  <option key={smtp._id} value={smtp._id}>
                    {smtp?.user}
                  </option>
                ))}
            </select>
          )}
        </div>

        {/* Email List Dropdown */}
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Email List
          </label>
          {emailListLoading ? (
            <p>Loading Email List options...</p>
          ) : emailListError ? (
            <p className="text-red-500">Error loading Email List options</p>
          ) : (
            <select
              value={emailListId}
              onChange={(e) => setEmailListId(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              required
            >
              <option value="">-- Select Email List --</option>
              {emailListOptions &&
                emailListOptions?.map((list) => (
                  <option key={list._id} value={list._id}>
                    {list.name}
                  </option>
                ))}
            </select>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            disabled={sentLoading}
          >
            {sentLoading ? "sending..." : "Send Email"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
