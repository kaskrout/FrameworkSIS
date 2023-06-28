import { ActivitiesContext } from "../context/ActivityContext";
import { useContext } from "react";

export const useActivitiesContext = () => {
  const context = useContext(ActivitiesContext);

  if (!context) {
    throw Error(
      "useActivitiesContext must be used inside a ActivityContextProvider"
    );
  }

  return context;
};
