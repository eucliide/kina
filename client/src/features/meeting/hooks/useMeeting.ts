import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ROUND_DURATION = 8 * 60;

export function useMeeting() {
  const navigate = useNavigate();

  const [remainingSeconds, setRemainingSeconds] =
    useState(ROUND_DURATION);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (seconds <= 1) {
          clearInterval(timer);

          navigate("/reflection");

          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const minutes = Math.floor(remainingSeconds / 60);

  const seconds = remainingSeconds % 60;

  return {
    partner: "Sarah",

    round: 1,

    question:
      "What's a small moment in your life that still makes you smile?",

    remainingTime:
      `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`,
  };
}import { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";

 const ROUND_DURATION = 8 * 60;

 export function useMeeting() {
   const navigate = useNavigate();

   const [remainingSeconds, setRemainingSeconds] =
     useState(ROUND_DURATION);

   useEffect(() => {
     const timer = window.setInterval(() => {
       setRemainingSeconds((seconds) => {
         if (seconds <= 1) {
           clearInterval(timer);

           navigate("/reflection");

           return 0;
         }

         return seconds - 1;
       });
     }, 1000);

     return () => clearInterval(timer);
   }, [navigate]);

   const minutes = Math.floor(remainingSeconds / 60);

   const seconds = remainingSeconds % 60;

   return {
     partner: "Sarah",

     round: 1,

     question:
       "What's a small moment in your life that still makes you smile?",

     remainingTime:
       `${minutes}:${seconds
         .toString()
         .padStart(2, "0")}`,
   };
 }
