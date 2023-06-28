import { useState } from "react";
import { useRolesContext } from "../hooks/useRolesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const RoleForm = () => {
  const { dispatch } = useRolesContext();
  const { user } = useAuthContext();

  const [RoleName, setRolename] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const role = { RoleName };

    const response = await fetch("/api/role", {
      method: "POST",
      body: JSON.stringify(role),
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
        setRolename("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_ROLE", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Role</h3>

      <label>Role Name:</label>
      <input
        type="text"
        onChange={(e) => setRolename(e.target.value)}
        value={RoleName}
        className={emptyFields.includes("RoleName") ? "error" : ""}
        
      />

      <button>Add Role</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RoleForm;
