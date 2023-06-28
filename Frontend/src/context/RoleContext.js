import { createContext, useReducer } from "react";

export const RolesContext = createContext();

export const rolesReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROLES":
      return {
        roles: action.payload,
      };
    case "CREATE_ROLES":
      return {
        roles: [action.payload, ...state.roles],
      };
    case "DELETE_ROLES":
      return {
        roles: state.roles.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const RolesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rolesReducer, {
    roles: [],
  });

  return (
    <RolesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RolesContext.Provider>
  );
};
