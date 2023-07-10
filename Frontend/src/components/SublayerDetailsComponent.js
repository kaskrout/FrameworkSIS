import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const SublayeryDetailsComponent = ({ sublayer }) => {
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [title, setTitle] = useState(sublayer.title);
  const [Details, setDetails] = useState(sublayer.Details);
  const [questions, setquestions] = useState(sublayer.questions);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const updateFields = async (e) => {
    e.preventDefault();
    const newSublayer = { title, Details, questions };
    try {
      const response = await fetch(`/api/sublayer/${sublayer._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newSublayer),
      });
      if (response.ok) {
        // Update was successful
        alert("Update successful!");
        navigate("/Cadreanalyse");
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
      <h1>Sublayer Details</h1>
      <h3>layer ID</h3>
      <input type="text" value={sublayer.layerId} disabled={true} />
      <h3>Title</h3>
      <input
        type="text"
        defaultValue={sublayer.title}
        disabled={fieldsDisabled}
        onChange={(e) => setTitle(e.target.value)}
      />

      <h3>Details</h3>
      <textarea
        type="text"
        defaultValue={sublayer.Details}
        disabled={fieldsDisabled}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>

      <h3>questions</h3>
      <textarea
        type="text"
        defaultValue={sublayer.questions}
        disabled={fieldsDisabled}
        onChange={(e) => setquestions(e.target.value)}
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

export default SublayeryDetailsComponent;
