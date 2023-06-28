import { createContext, useReducer } from 'react'

export const LayersContext = createContext()

export const layersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LAYERS': 
      return {
        layers: action.payload
      }
    case 'CREATE_LAYERS':
      return {
        layers: [action.payload, ...state.layers]
      }
    case 'DELETE_LAYERS':
      return {
        layers: state.layers.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const LayersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(layersReducer, {
    layer: null
  })

  return (
    <LayersContext.Provider value={{...state, dispatch}}>
      { children }
    </LayersContext.Provider>
  )
}