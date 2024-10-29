import axios from "axios";
import { useEffect, useState } from "react";

const useSmtpOptions = () => {
  const [smtpOptions, setSmtpOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchSmtpOptions = async () => {
    try {
      const response = await axios.get("https://meraj-email-sender-server.onrender.com/api/smtp");
      setSmtpOptions(response.data.data);
    } catch (err) {
      setError("Failed to load SMTP options");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSmtpOptions();
  }, []);

  return { smtpOptions, loading, error, refetch: fetchSmtpOptions };
};

export default useSmtpOptions;
