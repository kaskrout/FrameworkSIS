import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PhasesContextProvider } from "./context/PhaseContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ActivitiesContextProvider } from "./context/ActivityContext";
import { LayersContextProvider } from "./context/LayerContext";
import { SublayersContextProvider } from "./context/SublayerContext";
import { RolesContextProvider } from "./context/RoleContext";
import { SubrolessContextProvider } from "./context/SubroleContext";





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PhasesContextProvider>
      <ActivitiesContextProvider>
        <SublayersContextProvider>
        <LayersContextProvider> 
          <RolesContextProvider>
            <SubrolessContextProvider>
          <App />
          </SubrolessContextProvider>
          </RolesContextProvider>
        </LayersContextProvider>
        </SublayersContextProvider>
      </ActivitiesContextProvider>
      </PhasesContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);
