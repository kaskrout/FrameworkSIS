import { usePhasesContext } from "../hooks/usePhasesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const PhaseDetails = ({ phase }) => {
  const { dispatch } = usePhasesContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/phase/" + phase._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PHASE", payload: json });
    }
  };

  return (
    
    <div className="phase-details">
      <div className="phaseHead">
        <h4>{phase.title}</h4>
        <div className="phaseActivities">
          {phase.activities.map((activity) => {
            return (
              <Link
                key={activity._id}
                to={`/activityDetails/${activity._id}`}
                className="link"
              >
                <span>{activity.title}</span>
              </Link>
            );
          })}
        </div>
        <p>
          {formatDistanceToNow(new Date(phase.createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="phaseActions">
        <Link to={`/addActivity/${phase._id}`}>
          <span className="material-symbols-outlined">add</span>
        </Link>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    </div>
  );
};

export default PhaseDetails;
