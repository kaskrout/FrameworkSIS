import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const ActivityDetailsComponent = ({ activity }) => {
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [title, setTitle] = useState(activity.title);
  const [description, setDescription] = useState(activity.description);
  const [steps, setSteps] = useState(activity.steps);
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const updateFields = async (e) => {
    e.preventDefault();
    const newActivity = { title, description, steps };
    try {
      const response = await fetch(`/api/activity/${activity._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newActivity),
      });
      if (response.ok) {
        // Update was successful
        alert("Update successful!");
        navigate("/");
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
      <h1>Activity Details</h1>
      <h3>Phase ID</h3>
      <input type="text" value={activity.phaseId} disabled={true} />
      <h3>Title</h3>
      <input
        type="text"
        defaultValue={activity.title}
        disabled={fieldsDisabled}
        onChange={(e) => setTitle(e.target.value)}
      />

      <h3>Description</h3>
      <textarea
        type="text"
        defaultValue={activity.description}
        disabled={fieldsDisabled}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <h3>Steps</h3>
      <textarea
        type="text"
        defaultValue={activity.steps}
        disabled={fieldsDisabled}
        onChange={(e) => setSteps(e.target.value)}
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

export default ActivityDetailsComponent;
