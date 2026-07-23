import { createBrowserRouter } from "react-router-dom";

import App from "@/App";

import { JoinPage } from "@/features/join/pages/JoinPage";
import { NamePage } from "@/features/join/pages/NamePage";
import { LobbyPage } from "@/features/lobby/pages/LobbyPage";
import { MeetingPage } from "@/features/meeting/pages/MeetingPage";
import { ReflectionPage } from "@/features/reflection/pages/ReflectionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "/lobby",
    element: <LobbyPage />,
  },
  {
    path: "/meeting",
    element: <MeetingPage />,
  },
  {
    path: "/reflection",
    element: <ReflectionPage />,
  },
]);
