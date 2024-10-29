import { useState } from "react";
import useEmailListOptions from "../hooks/useEmailListOptions";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewEmailList = () => {
  const { emailListOptions, refetch } = useEmailListOptions(); // Fetch email data
  const [selectedEmailList, setSelectedEmailList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  // Function to open modal and set the selected email list
  const openModal = (emailList) => {
    setSelectedEmailList(emailList);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedEmailList(null);
    setIsModalOpen(false);
  };

  const handleDelete = async(id) =>{
    const confirmDelete = window.confirm("Are you sure you want to delete this email list?");
    if(confirmDelete){
        try {
            setIsDeleting(true)
            const result = await axios.delete(`https://meraj-email-sender-server.onrender.com/api/email-lists/${id}`)
            if(result.data.success){
                alert('Deleted successful')
                refetch()
            }
            
        } catch (error) {
            console.log(error);
            alert(error?.message)
        }finally{
            setIsDeleting(false)
        }
    }
  }

  return (
    <div className="w-2/3 bg-gray-700 rounded-lg p-4">
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-6 text-white">Email Lists</h1>
      <Link to='/dashboard/emailList'>
          <button className="btn btn-info btn-sm hover:bg-blue-600 text-white">Create New List</button>
        </Link>

      </div>

      <table className="min-w-full bg-white  rounded-lg" >
        <thead>
          <tr>
            <th className="py-2 px-2 text-start border-b">List Name</th>
            <th className="py-2 px-2 text-start border-b">Total Emails</th>
            <th className="py-2 px-2 text-center border-b">Actions</th>
          </tr>
        </thead>
        <tbody >
          {emailListOptions.map((emailList) => (
            <tr key={emailList._id}  >
              <td className="py-2 px-2 border-b">{emailList.name}</td>
              <td className="py-2 px-2 border-b">{emailList.emails.length}</td>
              <td className="py-2 px-2 border-b flex justify-center gap-5" >
                <button
                  onClick={() => openModal(emailList)}
                  className=" btn btn-success btn-xs text-white hover:bg-blue-600"
                >
                  Details
                </button>
                <button
                  onClick={() => handleDelete(emailList._id)}
                  className=" btn btn-error btn-xs text-white hover:bg-blue-600"
                  disabled= {isDeleting}
                >
                   {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Scrollable Modal */}
      {isModalOpen && selectedEmailList && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              Emails in {selectedEmailList.name}
            </h2>
            <div className="h-64 overflow-y-auto border border-gray-300 p-4 rounded">
              {selectedEmailList.emails.map((email, index) => (
                <p key={index} className="py-1 border-b">
                  {email}
                </p>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEmailList;
