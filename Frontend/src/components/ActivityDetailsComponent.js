

const ActivityDetailsComponent = ({ activity }) => {
  // const { dispatch } = usePhasesContext();
  // const { user } = useAuthContext();

  return (
    <div className="activity-details">
      <h1>Activity Details</h1>
      <h3>Phase ID</h3>
      <span>{activity.phaseId}</span>
      <h3>Title</h3>
      <span>{activity.title}</span>
      <h3>Description</h3>
      <span>{activity.description}</span>
      <h3>Steps</h3>ww
      <span>{activity.steps}</span>
    </div>
  );
};

export default ActivityDetailsComponent;
