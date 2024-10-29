import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import EmailReplyNotification from "./components/EmailReplyNotification";

function App() {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet></Outlet>
          <Toaster></Toaster>
          <EmailReplyNotification></EmailReplyNotification>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-gray-700 text-white min-h-full w-80 p-4">
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
