import { useEffect } from "react";
import { useLayersContext } from "../hooks/useLayersContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import LayerDetails from "../components/LayerDetails";
//import LayerForm from "../components/layerForm";

const Cadreanalyse = () => {
  const { layers, dispatch } = useLayersContext();
  const { user } = useAuthContext();
  

  useEffect(() => {
    const fetchlayers = async () => {
      const response = await fetch("/api/layer", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_LAYERS", payload: json });
      }
    };

    if (user) {
      fetchlayers();
    }
  }, [dispatch, user]);
  

  return (
    <div className="home">
      <div className="workouts">
        {layers &&
          layers.map((layer) => <LayerDetails key={layer._id} layer={layer} />)}
      </div>
      <LayerDetails />
    </div>
  );
};

export default Cadreanalyse;
