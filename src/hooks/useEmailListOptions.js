import axios from "axios";
import { useEffect, useState } from "react";

// Custom hook to fetch Email List options
const useEmailListOptions = () => {
  const [emailListOptions, setEmailListOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the email list options
  const fetchEmailListOptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://meraj-email-sender-server.onrender.com/api/email-lists");
      setEmailListOptions(response.data.data);
    } catch (err) {
      setError("Failed to load email list options");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to initially fetch the data
  useEffect(() => {
    fetchEmailListOptions();
  }, []);

  // Return the data, loading state, error, and refetch function
  return { emailListOptions, loading, error, refetch: fetchEmailListOptions };
};

export default useEmailListOptions;


// import axios from "axios";
// import { useEffect, useState } from "react";

// // Custom hook to fetch Email List options
// const useEmailListOptions = () => {
//     const [emailListOptions, setEmailListOptions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       const fetchEmailListOptions = async () => {
//         try {
//           const response = await axios.get("https://meraj-email-sender-server.onrender.com/api/email-lists");
//           setEmailListOptions(response.data.data);
//         } catch (err) {
//           setError("Failed to load email list options");
//           console.log(err);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchEmailListOptions();
//     }, []);
  
//     return { emailListOptions, loading, error }
// }

// export default useEmailListOptions;