

const SublayeryDetailsComponent = ({ sublayer }) => {
    // const { dispatch } = usePhasesContext();
    // const { user } = useAuthContext();
  
    return (
      <div className="activity-details">
        <h1>Activity Details</h1>
        <h3>Phase ID</h3>
        <span>{sublayer.phaseId}</span>
        <h3>Title</h3>
        <span>{sublayer.title}</span>
        <h3>Description</h3>
        <span>{sublayer.description}</span>
        <h3>Steps</h3>
        <span>{sublayer.steps}</span>
      </div>
    );
  };
  
  export default SublayeryDetailsComponent;
  