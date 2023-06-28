import { useState } from "react";
import { useActivitiesContext } from "../hooks/useActivitiesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const ActivityForm = () => {
  const { dispatch } = useActivitiesContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const phaseId = id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const activity = { phaseId, title, description, steps };

    const response = await fetch("/api/activity", {
      method: "POST",
      body: JSON.stringify(activity),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setSteps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_ACTIVITY", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Activity</h3>

      <label>Phase ID:</label>
      <input type="text" value={id} disabled />

      <label>Activity title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Activity Description:</label>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        cols="30"
        rows="6"
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      ></textarea>
      <label>Activity Steps:</label>

      <textarea
        onChange={(e) => setSteps(e.target.value)}
        cols="30"
        rows="6"
        value={steps}
        className={emptyFields.includes("steps") ? "error" : ""}
      ></textarea>

      <button>Add Activity</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ActivityForm;
