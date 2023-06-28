import { createContext, useReducer } from 'react'

export const PhasesContext = createContext()

export const phasesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PHASES': 
      return {
        phases: action.payload
      }
    case 'CREATE_PHASES':
      return {
        phases: [action.payload, ...state.phases]
      }
    case 'DELETE_PHASES':
      return {
        phases: state.phases.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const PhasesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(phasesReducer, {
    phases: null
  })

  return (
    <PhasesContext.Provider value={{...state, dispatch}}>
      { children }
    </PhasesContext.Provider>
  )
}