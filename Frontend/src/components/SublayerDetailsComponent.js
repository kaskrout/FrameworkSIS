const SublayeryDetailsComponent = ({ sublayer }) => {
  // const { dispatch } = usePhasesContext();
  // const { user } = useAuthContext();
  return (
    <div className="activity-details">
      <h1>Sublayer Details</h1>
      <h3>Layer ID</h3>
      <span>{sublayer.layerId}</span>
      <h3>Title</h3>
      <span>{sublayer.title}</span>
      <h3>Details</h3>
      <span>{sublayer.Details}</span>
      <h3>Questions</h3>
      <span>{sublayer.questions}</span>
    </div>
  );
};

export default SublayeryDetailsComponent;
