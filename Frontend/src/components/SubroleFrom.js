import { useState } from "react";
import { useActivitiesContext } from "../hooks/useActivitiesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const SubroleForm = () => {
  const { dispatch } = useActivitiesContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const roleId = id;
  const [subroleName, setSubroleName] = useState("");
  const [details, setdetails] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const subrole = { roleId, subroleName, details };

    const response = await fetch("/api/subrole", {
      method: "POST",
      body: JSON.stringify(subrole),
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
      setSubroleName("");
      setdetails("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_SUBROLE", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Subrole</h3>

      <label>role ID:</label>
      <input type="text" value={id} disabled />

      <label>Subrole Name:</label>
      <input
        type="text"
        onChange={(e) => setSubroleName(e.target.value)}
        value={subroleName}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Activity Description:</label>
      <textarea
        onChange={(e) => setdetails(e.target.value)}
        cols="30"
        rows="6"
        value={details}
        className={emptyFields.includes("details") ? "error" : ""}
      ></textarea>
      

      <button>Add subrole</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SubroleForm;
