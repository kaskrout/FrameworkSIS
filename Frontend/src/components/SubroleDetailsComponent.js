

const SubroleDetails = ({ subrole }) => {
    // const { dispatch } = usePhasesContext();
    // const { user } = useAuthContext();
  
    return (
      <div className="activity-details">
        <h1>Subrole Details</h1>
        <h3>Role ID</h3>
        <span>{subrole.roleId}</span>
        <h3>name</h3>
        <span>{subrole.subroleName}</span>
        <h3>details</h3>
        <span>{subrole.details}</span>
    
      </div>
    );
  };
  
  export default SubroleDetails;
  