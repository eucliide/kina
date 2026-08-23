import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { AuthLayout } from "@/app/AuthLayout";

import App from "@/App";

import { JoinPage } from "@/features/join/pages/JoinPage";
import { NamePage } from "@/features/join/pages/NamePage";
import { LobbyPage } from "@/features/lobby/pages/LobbyPage";
import { MeetingPage } from "@/features/meeting/pages/MeetingPage";
import { CreatePage } from "@/features/create/pages/CreatePage";
import { EventReadyPage } from "@/features/create/pages/EventReadyPage";
import { WnrsPage } from "@/features/wnrs/pages/WnrsPage";
import { GatherAroundPage } from "@/features/gather-around/pages/GatherAroundPage";
import { TableTopicsPage } from "@/features/tabletopics/pages/TableTopicsPage";
import { SecretMissionPage } from "@/features/mission/pages/SecretMissionPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },

      {
        path: "/create",
        element: <CreatePage />,
      },

      {
        path: "/create/ready",
        element: <EventReadyPage />,
      },

      {
        path: "/join",
        element: <JoinPage />,
      },

      {
        path: "/join/name",
        element: <NamePage />,
      },

      {
        path: "/secret-mission",
        element: <SecretMissionPage />,
      },

      {
        path: "/lobby",
        element: <LobbyPage />,
      },

      {
        path: "/meeting",
        element: <MeetingPage />,
      },

      {
        path: "/wnrs",
        element: <WnrsPage />,
      },

      {
        path: "/gather-around",
        element: <GatherAroundPage />,
      },

      {
        path: "/tabletopics",
        element: <TableTopicsPage />,
      },

      {
        path: "/reflection",
        element: <Navigate to="/lobby" replace />,
      },
    ],
  },
]);
