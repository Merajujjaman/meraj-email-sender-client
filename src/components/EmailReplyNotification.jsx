import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";


const EmailReplyNotification = () => {
  // Function to handle SSE connection
  useEffect(() => {
    const eventSource = new EventSource("https://meraj-email-sender-server.onrender.com/events");

    // Listen for messages from the server via SSE
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data); // Parse the incoming event data
      console.log("New email reply:", data);
      const name = data?.reply?.from?.match(/"(.*?)"/)[1];
      const email = data?.reply?.from?.match(/<(.*?)>/)[1];
      const message = data?.reply?.message?.split("\nOn ")[0].trim()

      // Show the alert with email reply details
      toast.success(`New email reply received!\n\nFrom: ${name}\nEmail: ${email}\n\nMessage: ${message}`, {
        position: "top-center",
        duration: 5000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    };

    // Handle error events and close the connection
    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };

    // Clean up the eventSource when the component unmounts
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <Toaster></Toaster>
    </>
  );
};

export default EmailReplyNotification;
