import { useEffect } from "react";
import { useLayersContext } from "../hooks/useLayersContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import PhaseDetails from "../components/LayerDetails";
import PhaseForm from "../components/LayerForm";
import SublayerForm from "../components/SublayerForm";

const AddSublayer = () => {
  const { layers, dispatch } = useLayersContext();
  const { user } = useAuthContext();

  return (
    <div className="home">
      <SublayerForm />
    </div>
  );
};

export default AddSublayer;
