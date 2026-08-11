import { createBrowserRouter } from "react-router-dom";

import App from "@/App";

import { JoinPage } from "@/features/join/pages/JoinPage";
import { NamePage } from "@/features/join/pages/NamePage";
import { LobbyPage } from "@/features/lobby/pages/LobbyPage";
import { MeetingPage } from "@/features/meeting/pages/MeetingPage";
import { ReflectionPage } from "@/features/reflection/pages/ReflectionPage";
import { CreatePage } from "@/features/create/pages/CreatePage";
import { WnrsPage } from "@/features/wnrs/pages/WnrsPage";
import { GatherAroundPage } from "@/features/gather-around/pages/GatherAroundPage";
import { SecretMissionPage } from "@/features/mission/pages/SecretMissionPage";

export const router =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },

    {
      path: "/create",
      element: <CreatePage />,
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
      element: (
        <SecretMissionPage
          onContinue={() => {
            window.location.href = "/lobby";
          }}
        />
      ),
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
      path: "/reflection",
      element: <ReflectionPage />,
    },
  ]);
