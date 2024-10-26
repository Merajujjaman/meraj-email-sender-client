import { useState } from "react";
import axios from "axios";
import useSmtpOptions from "../hooks/useSmtpOptions";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ViewSmtp = () => {
  const {
    smtpOptions,
    loading: smtpLoading,
    error: smtpError,
    refetch,
  } = useSmtpOptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSmtp, setSelectedSmtp] = useState(null);

  // Open the modal and set the selected SMTP
  const openModal = (smtp) => {
    setSelectedSmtp(smtp);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedSmtp(null);
    setIsModalOpen(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSmtp({
      ...selectedSmtp,
      [name]: value,
    });
  };

  // Handle form submission for updating SMTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      user: selectedSmtp.user,
      host: selectedSmtp.host,
      port: selectedSmtp.port,
    };
    try {
      await axios.patch(
        `https://automatic-email-sender-server.vercel.app/api/smtp/${selectedSmtp._id}`,
        updateData
      );
      toast.success("SMTP updated successfully!");
      closeModal();
      refetch();
    } catch (error) {
      console.error("Error updating SMTP:", error);
      toast.error("Failed to update SMTP.");
    }
  };

  // Handle SMTP deletion
  const handleDelete = async (id) => {
    const deleteConfirm = window.confirm(
      "Are you sure you want to delete this SMTP"
    );
    if (deleteConfirm) {
      try {
        await axios.delete(`https://automatic-email-sender-server.vercel.app/api/smtp/${id}`);
        toast.success("SMTP deleted successfully!");
        refetch();
      } catch (error) {
        console.error("Error deleting SMTP:", error);
        toast.error("Failed to delete SMTP.");
      }
    }
  };

  if (smtpLoading) return <p>Loading...</p>;
  if (smtpError) return <p>Error: {smtpError}</p>;

  return (
    <div className="w-2/3 bg-gray-700 rounded-lg p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6 text-white">SMTP List</h1>
        <Link to='/dashboard/smtp'>
          <button className="btn btn-info btn-sm hover:bg-blue-600 text-white"> Create SMTP</button>
        </Link>
      </div>

      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-2 text-start border-b">User</th>
            <th className="py-2 px-2 text-start border-b">Host</th>
            <th className="py-2 px-2 text-start border-b">Port</th>
            <th className="py-2 px-2 text-start border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {smtpOptions.map((smtp) => (
            <tr key={smtp._id}>
              <td className="py-2 px-2 border-b">{smtp.user}</td>
              <td className="py-2 px-2 border-b">{smtp.host}</td>
              <td className="py-2 px-2 border-b">{smtp.port}</td>
              <td className="py-2 px-2 border-b">
                <button
                  onClick={() => openModal(smtp)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(smtp._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating SMTP */}
      {isModalOpen && selectedSmtp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Update SMTP</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">User</label>
                <input
                  type="text"
                  name="user"
                  value={selectedSmtp.user} // Default value from database
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Host</label>
                <input
                  type="text"
                  name="host"
                  value={selectedSmtp.host} // Default value from database
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Port</label>
                <input
                  type="number"
                  name="port"
                  value={selectedSmtp.port} // Default value from database
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-success text-white hover:bg-green-600 mr-5"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-sm btn-error text-white hover:bg-gray-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSmtp;
