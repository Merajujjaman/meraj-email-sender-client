import { useState } from "react";
import axios from "axios";
import useCampaignOptions from "../hooks/useCampaignOptions";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ViewCampaign = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const { campaigns, loading, error, refetch } = useCampaignOptions();
  console.log("reply-", selectedCampaign);
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `https://meraj-email-sender-server.onrender.com/api/campaigns/${id}`
      );
      if (result.data.success) {
        toast.success("Campaign deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Error deleting campaign");
      console.log(error);
    }
  };

  const handleDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p>Error: {error}</p>;

  const extractMainReplies = (message) => {
    return message
      .split(/On .*?wrote:/g) // Split by each reply header
      .map((reply) => reply.replace(/^>+/gm, "").trim()) // Remove ">" from quoted lines
      .filter((reply) => reply); // Remove empty entries
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-2 ">
        <h2 className="text-2xl font-semibold mb-4">Campaign List</h2>
        <Link to="/dashboard/campaign">
          <button className="btn btn-info btn-sm hover:bg-blue-600 text-white">
            Start Campaign
          </button>
        </Link>
      </div>

      {/* Campaign Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 text-start">Campaign Name</th>
              <th className="px-4 py-2 text-start">Sender Name</th>
              <th className="py-2 text-start">Reply Count</th>
              <th className="px-4 py-2 text-start">SMTP</th>
              <th className="px-4 py-2 text-start">IMAP</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns?.map((campaign) => (
              <tr key={campaign._id} className="border-t">
                <td className="px-4 py-2">{campaign.name}</td>
                <td className="px-4 py-2">{campaign.senderName}</td>
                <td className="px-4 py-2">{campaign.replies.length}</td>
                <td className="px-4 py-2">{campaign?.smtpId?.user}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    campaign?.smtpId?.isOpen ? "text-green-600" : "text-red-500"
                  } `}
                >
                  {campaign?.smtpId?.isOpen ? "On" : "Off"}
                </td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                    onClick={() => handleDetails(campaign)}
                  >
                    Details
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(campaign._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to show campaign details */}
      {showModal && selectedCampaign && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg max-h-full overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>
            <p>
              <strong>Name:</strong> {selectedCampaign.name}
            </p>
            <p>
              <strong>Subject:</strong> {selectedCampaign.subject}
            </p>
            <p>
              <strong>Sender Name:</strong> {selectedCampaign.senderName}
            </p>
            <div className="space-y-4">
              <strong>Message:</strong>
              {
              extractMainReplies(selectedCampaign.message).map((reply, index) =>{
                <p key={index} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 whitespace-pre-line">
                  {reply}
                </p>
              })
              }
            </div>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold mb-2">Replies:</h3>

            {selectedCampaign.replies.length === 0 ? (
              <p>No replies yet</p>
            ) : (
              <ul className="space-y-2">
                {selectedCampaign.replies.map((reply, index) => (
                  <li key={index} className="bg-gray-100 p-3 rounded-lg">
                    <p>
                      <strong>From:</strong> {reply.from}
                    </p>

                    {/* <strong>Message:</strong> {reply.message} */}
                    <div>
                      <strong>Message:</strong>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="mt-2 space-y-4 text-gray-700">
                          {reply.message
                            .split(/On (.*) wrote:/)
                            .map((section, index) => (
                              <div
                                key={index}
                                className="border-l-4 pl-4 border-gray-300"
                              >
                                {index === 0 ? (
                                  <p>{section}</p>
                                ) : (
                                  <div>
                                    <p className="font-medium text-sm text-gray-500 mb-2">
                                      On {section.split(">")[0]} <br /> wrote:
                                    </p>
                                    <p>{section.split(">")[1]?.trim()}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <p>
                      <strong>Received At:</strong>{" "}
                      {new Date(reply.receivedAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {/* Close Modal Button */}
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCampaign;
