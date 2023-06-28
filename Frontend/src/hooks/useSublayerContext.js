import { SublayersContext } from "../context/SublayerContext";
import { useContext } from "react";

export const useSublayersContext = () => {
  const context = useContext(SublayersContext);

  if (!context) {
    throw Error(
      "useSublayersContext must be used inside a SublayerContextProvider"
    );
  }

  return context;
};
