import { LayersContext } from "../context/LayerContext";
import { useContext } from "react";

export const useLayersContext = () => {
  const context = useContext(LayersContext);

  if (!context) {
    throw Error(
      "useLayersContext must be used inside an LayersContextProvider"
    );
  }

  return context;
};
