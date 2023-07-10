import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const SubroleDetails = ({ subrole }) => {
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [subroleName, setsubroleName] = useState(subrole.subroleName);
  const [details, setdetails] = useState(subrole.details);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const updateFields = async (e) => {
    e.preventDefault();
    const newSubrole = { subroleName, details };
    try {
      const response = await fetch(`/api/subrole/${subrole._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newSubrole),
      });
      if (response.ok) {
        // Update was successful
        alert("Update successful!");
        navigate("/Role");
      } else {
        // Update failed
        alert("Update failed!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="activity-details">
      <h1>subrole Details</h1>
      <h3>role ID</h3>
      <input type="text" value={subrole.roleId} disabled={true} />
      <h3>Name</h3>
      <input
        type="text"
        defaultValue={subrole.subroleName}
        disabled={fieldsDisabled}
        onChange={(e) => setsubroleName(e.target.value)}
      />

      <h3>Description</h3>
      <textarea
        type="text"
        defaultValue={subrole.details}
        disabled={fieldsDisabled}
        onChange={(e) => setdetails(e.target.value)}
      ></textarea>

      <div className="updateButtons">
        <button
          className="enable"
          onClick={() => setFieldsDisabled(!fieldsDisabled)}
        >
          {fieldsDisabled ? "Enable" : "Disable"} Fields
        </button>
        <button className="update" onClick={(e) => updateFields(e)}>
          Update
        </button>
      </div>
    </div>
  );
};

export default SubroleDetails;
