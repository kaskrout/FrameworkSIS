import { SubrolesContext } from "../context/SubroleContext";
import { useContext } from "react";

export const useSubrolesContext = () => {
  const context = useContext(SubrolesContext);

  if (!context) {
    throw Error(
      "useSubrolsContext must be used inside a SubroleContextProvider"
    );
  }

  return context;
};
