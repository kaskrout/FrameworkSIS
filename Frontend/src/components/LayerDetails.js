import { useLayersContext } from "../hooks/useLayersContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const LayerDetails = ({ layer }) => {
  const { dispatch } = useLayersContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    console.log("layer",layer); 


    const response = await fetch("/api/layer/" + layer._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_LAYERS", payload: json });
    }
  };
//console.log("layer",layer); 
  return (
    <div className="phase-details">
      <div className="phaseHead">
      <h4>{layer.title}</h4>
        <div className="phaseActivities">
          {layer.sublayers.map((sublayer) => {
            return (
              <Link
                key={sublayer._id}
                to={`/sublayerDetails/${sublayer._id}`}
                className="link"
              >
                <span>{sublayer.title}</span>
              </Link>
            );
          })}
        </div>
        <p>
          {formatDistanceToNow(new Date(layer.createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="phaseActions">
        <Link to={`/addActivity/${layer._id}`}>
          <span className="material-symbols-outlined">add</span>
        </Link>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    </div>
  );
};

export default LayerDetails;
