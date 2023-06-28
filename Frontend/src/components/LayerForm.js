import { useState } from "react";
import { useLayersContext } from "../hooks/useLayersContext";
import { useAuthContext } from "../hooks/useAuthContext";

const LayerForm = () => {
  const { dispatch } = useLayersContext();
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

    const layer = { title };

    const response = await fetch("/api/layer", {
      method: "POST",
      body: JSON.stringify(layer),
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
      dispatch({ type: "CREATE_LAYERS", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New layer</h3>

      <label>Layer title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <button>Add Layer</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LayerForm;
