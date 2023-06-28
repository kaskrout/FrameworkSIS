import { createContext, useReducer } from "react";

export const SubrolesContext = createContext();

export const SubrolesReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUBROLES":
      return {
        subroles: action.payload,
      };
    case "CREATE_SUBROLES":
      return {
        subroles: [action.payload, ...state.subroles],
      };
    case "DELETE_SUBROLES":
      return {
        subroles: state.subroles.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const SubrolessContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SubrolesReducer, {
    activities: null,
  });

  return (
    <SubrolesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SubrolesContext.Provider>
  );
};
