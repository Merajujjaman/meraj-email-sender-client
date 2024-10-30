import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import EmailReplyNotification from "./components/EmailReplyNotification";

function App() {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content mt-4 md:mt-4 flex flex-col items-center justify-center">
          <Outlet></Outlet>
          <Toaster></Toaster>
          <EmailReplyNotification></EmailReplyNotification>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost btn-sm absolute top-1 left-1 drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-gray-700 text-white min-h-full w-60 md:w-80 p-2 md:p-4">
            {/* Sidebar content here */}
            <li className="hover:bg-black rounded-lg">
              <NavLink to="/dashboard/smtp-view">SMTP</NavLink>
            </li>
            <li className="hover:bg-black rounded-lg">
              <NavLink to="/dashboard/emailList-view">Email List</NavLink>
            </li>
            <li className="hover:bg-black rounded-lg">
              <NavLink to="/dashboard/campaign-view">View Campaigns</NavLink>
            </li>
            <li className="hover:bg-black rounded-lg">
              <NavLink to="/dashboard/campaign">Start Campaign</NavLink>
            </li>

            <li className="hover:bg-black rounded-lg">
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
