import { useState } from "react";
import { usePhasesContext } from "../hooks/usePhasesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PhaseForm = () => {
  const { dispatch } = usePhasesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const phase = { title };

    const response = await fetch("/api/phase", {
      method: "POST",
      body: JSON.stringify(phase),
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
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_PHASE", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Phase</h3>

      <label>Phase title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
        
      />

      <button>Add Phase</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PhaseForm;
