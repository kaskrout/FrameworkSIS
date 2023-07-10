import { useEffect } from "react";
import { usePhasesContext } from "../hooks/usePhasesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import PhaseDetails from "../components/PhaseDetails";
import PhaseForm from "../components/PhaseForm";

const Home = () => {
  const { phases, dispatch } = usePhasesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPhases = async () => {
      const response = await fetch("/api/phase", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PHASES", payload: json });
      }
    };

    if (user) {
      fetchPhases();
    }
  }, [dispatch, user, phases]);

  return (
    <div className="home">
      <div className="Phase-border">
        {phases &&
          phases.map((phase) => <PhaseDetails key={phase._id} phase={phase} />)}
      </div>
      <PhaseForm />
    </div>
  );
};

export default Home;
