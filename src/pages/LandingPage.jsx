import EmailReplyNotification from "../components/EmailReplyNotification";

const LandingPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center px-4">
        {/* App Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Campaign Manager
        </h1>

        {/* App Subtitle */}
        <p className="text-lg md:text-2xl mb-8">
          Manage your email campaigns effortlessly with real-time notifications.
        </p>

        {/* Call-to-Action Button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300"
          onClick={() => window.location.href = "/dashboard"} // Modify as needed
        >
          Get Started
        </button>

        {/* Additional Features */}
        <div className="mt-8 space-y-4">
          <p>✔️ Track Campaign Replies in Real-Time</p>
          <p>✔️ Manage Email Lists and SMTP Settings</p>
          <p>✔️ Simplified Campaign Management</p>
        </div>
      </div>
      <EmailReplyNotification></EmailReplyNotification>
    </div>
  );
};

export default LandingPage;
