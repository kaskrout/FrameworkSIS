import { useRolesContext } from "../hooks/useRolesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const RoleDetails = ({ role }) => {
  const { dispatch } = useRolesContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/role/" + role._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_Role", payload: json });
    }
  };

  return (
    
    <div className="phase-details">
      <div className="phaseHead">
        <h4>{role.RoleName}</h4>
        <div className="phaseActivities">
          {role.subroles.map((subrole) => {
            return (
              <Link
                key={subrole._id}
                to={`/subroleDetails/${subrole._id}`}
                className="link"
              >
                <span>{subrole.subroleName}</span>
              </Link>
            );
          })}
        </div>
        <p>
          {formatDistanceToNow(new Date(role.createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="phaseActions">
        <Link to={`/addRole/${role._id}`}>
          <span className="material-symbols-outlined">add</span>
        </Link>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    </div>
  );
};

export default RoleDetails;
