import { createContext, useReducer } from "react";

export const SublayersContext = createContext();

export const SublayersReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUBLAYERS":
      return {
        sublayers: action.payload,
      };
    case "CREATE_SUBLAYERS":
      return {
        sublayers: [action.payload, ...state.sublayers],
      };
    case "DELETE_SUBLAYERS":
      return {
        sublayers: state.sublayers.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const SublayersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SublayersReducer, {
    sublayers: [],
  });

  return (
    <SublayersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SublayersContext.Provider>
  );
};
