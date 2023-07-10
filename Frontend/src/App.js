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
import AddSublayer from "./pages/addSublayer";
import AddSubrole from "./pages/addSubrole";
import SublayerDetails from "./pages/sublayerDetails";
import Ressources from "./pages/Ressources";
import Role from "./pages/Role";
import SubroleDetails from "./pages/subroleDetails";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
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
              path="/Role"
              element={user ? <Role /> : <Navigate to="/login" />}
            />

            <Route
              path="/addRole/:id"
              element={user ? <AddSubrole /> : <Navigate to="/login" />}
            />

            <Route
              path="/subroleDetails/:id"
              element={user ? <SubroleDetails /> : <Navigate to="/login" />}
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
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
