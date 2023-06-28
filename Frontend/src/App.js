import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AddActivity from "./pages/addActivity";
import ActivityDetails from "./pages/activityDetails";
import Cadreanalyse from "./pages/Cadreanalyse";
import AddSublayer from "./pages/addSublayer"
import SublayerDetails from "./pages/sublayerDetails";
import Ressources from "./pages/Ressources";



function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            
          
            <Route
              path="/Ressources"
              element={user ? <Ressources /> : <Navigate to="/Ressources" />}
            />
            <Route
              path="/addActivity/:id"
              element={user ? <AddActivity /> : <Navigate to="/login" />}
            />
            <Route
              path="/activityDetails/:id"
              element={user ? <ActivityDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/Cadreanalyse"
              element={user ? <Cadreanalyse /> : <Navigate to="/login" />}
            />
            <Route
              path="/Ressources"
              element={user ? <Ressources /> : <Navigate to="/login" />}
            />

            
            <Route
              path="/addSublayer/:id"
              element={user ? <AddSublayer /> : <Navigate to="/login" />}
            />
            <Route
              path="/SublayerDetails/:id"
              element={user ? <SublayerDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
