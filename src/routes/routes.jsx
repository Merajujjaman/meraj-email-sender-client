import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateSmtp from "../pages/CreateSmtp";
import CreateEmailList from "../pages/CreateEmailList";
import CreateCampaign from "../pages/CreateCampaign";
import ViewEmailList from "../pages/ViewEmailList";
import ViewSmtp from "../pages/ViewSmtp";
import ViewCampaign from "../pages/ViewCampaign";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage></LandingPage>,
    errorElement: <NotFoundPage></NotFoundPage>
  },
  {
    path: "/dashboard",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <CreateCampaign></CreateCampaign>,
      },
      {
        path: 'campaign',
        element: <CreateCampaign></CreateCampaign>,
      },
      {
        path: 'campaign-view',
        element: <ViewCampaign></ViewCampaign>
      },
      {
        path: "smtp",
        element: <CreateSmtp></CreateSmtp>,
      },
      {
        path: "smtp-view",
        element: <ViewSmtp></ViewSmtp>,
      },
      {
        path: "emailList",
        element: <CreateEmailList></CreateEmailList>,
      },
      {
        path: "emailList-view",
        element: <ViewEmailList></ViewEmailList>,
      },
    ],
  },
]);
export default router;
