import { RolesContext } from "../context/RoleContext";
import { useContext } from "react";

export const useRolesContext = () => {
  const context = useContext(RolesContext);

  if (!context) {
    throw Error(
      "useRolesContext must be used inside an RolesContextProvider"
    );
  }

  return context;
};
