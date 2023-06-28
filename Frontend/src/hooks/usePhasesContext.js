import { PhasesContext } from "../context/PhaseContext";
import { useContext } from "react";

export const usePhasesContext = () => {
  const context = useContext(PhasesContext);

  if (!context) {
    throw Error(
      "usePhasesContext must be used inside an PhasesContextProvider"
    );
  }

  return context;
};
