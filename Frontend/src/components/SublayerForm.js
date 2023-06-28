import { useState } from "react";
import { useSublayersContext } from "../hooks/useSublayerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const SublayerForm = () => {
  const { dispatch } = useSublayersContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const layerId = id;
  const [title, setTitle] = useState("");
  const [Details, setDetails] = useState("");
  const [questions, setquestions] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const sublayer = { layerId, title, Details, questions };

    const response = await fetch("/api/sublayer", {
      method: "POST",
      body: JSON.stringify(sublayer),
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
      setDetails("");
      setquestions("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_SUBLAYER", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Sublayer</h3>

      <label>layer ID:</label>
      <input type="text" value={id} disabled />

      <label>sublayer title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Sublayer details:</label>
      <textarea
        onChange={(e) => setDetails(e.target.value)}
        cols="30"
        rows="6"
        value={Details}
        className={emptyFields.includes("Details") ? "error" : ""}
      ></textarea>
      <label>Sublayer questions:</label>

      <textarea
        onChange={(e) => setquestions(e.target.value)}
        cols="30"
        rows="6"
        value={questions}
        className={emptyFields.includes("questions") ? "error" : ""}
      ></textarea>

      <button>Add Sublayer</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SublayerForm;
