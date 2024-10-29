import { useState, useEffect } from "react";
import axios from "axios";

const useCampaignOptions = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("https://meraj-email-sender-server.onrender.com/api/campaigns");
      setCampaigns(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return { campaigns, loading, error, refetch: fetchCampaigns};
};

export default useCampaignOptions;
