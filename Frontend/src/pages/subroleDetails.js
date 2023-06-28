import { useEffect } from "react";
import { useSubrolesContext } from "../hooks/useSubrolescontext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import SubroleDetailsComponent from "../components/SubroleDetailsComponent";

const SubroleDetails = () => {
  const { subroles, dispatch } = useSubrolesContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  useEffect(() => {
    const fetchSubrole = async () => {
      const response = await fetch(`/api/subrole/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SUBROLES", payload: json });
      }
    };

    if (user) {
      fetchSubrole();
    }
  }, [dispatch, user, id, subroles]);

  return (
    <div className="workouts">
      {subroles && <SubroleDetailsComponent activity={subroles} />}
    </div>
  );
};

export default SubroleDetails;
