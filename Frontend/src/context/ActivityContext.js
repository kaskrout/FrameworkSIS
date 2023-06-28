import { createContext, useReducer } from "react";

export const ActivitiesContext = createContext();

export const ActivitiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return {
        activities: action.payload,
      };
    case "CREATE_ACTIVITIES":
      return {
        activities: [action.payload, ...state.activities],
      };
    case "DELETE_ACTIVITIES":
      return {
        acitivites: state.acitivites.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ActivitiesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivitiesReducer, {
    activities: null,
  });

  return (
    <ActivitiesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
