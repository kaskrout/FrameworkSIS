import { useEffect } from "react";
import { useActivitiesContext } from "../hooks/useActivitiesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import ActivityDetailsComponent from "../components/ActivityDetailsComponent";

const ActivityDetails = () => {
  const { activities, dispatch } = useActivitiesContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch(`/api/activity/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ACTIVITIES", payload: json });
      }
    };

    if (user) {
      fetchActivity();
    }
  }, [dispatch, user, id, activities]);

  return (
    <div className="workouts">
      {activities && <ActivityDetailsComponent activity={activities} />}
    </div>
  );
};

export default ActivityDetails;
