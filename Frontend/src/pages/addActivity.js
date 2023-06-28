import { useEffect } from "react";
import { usePhasesContext } from "../hooks/usePhasesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import PhaseDetails from "../components/PhaseDetails";
import PhaseForm from "../components/PhaseForm";
import ActivityForm from "../components/ActivityForm";

const AddActivity = () => {
  const { phases, dispatch } = usePhasesContext();
  const { user } = useAuthContext();

  return (
    <div className="home">
      <ActivityForm />
    </div>
  );
};

export default AddActivity;
