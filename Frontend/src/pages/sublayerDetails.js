import { useEffect } from "react";
import { useSublayersContext } from "../hooks/useSublayerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import SublayerDetailsComponent from "../components/SublayerDetailsComponent";

const SublayerDetails = () => {
  const { sublayers, dispatch } = useSublayersContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  useEffect(() => {
    const fetchSublayer = async () => {
      const response = await fetch(`/api/sublayers/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ACTIVITIES", payload: json });
      }
    };

    if (user) {
        fetchSublayer();
    }
  }, [dispatch, user, id, sublayers]);

  return (
    <div className="workouts">
      {sublayers && <SublayerDetailsComponent activity={sublayers} />}
    </div>
  );
};

export default SublayerDetails;
