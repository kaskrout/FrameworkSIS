import { useEffect } from "react";
import { useRolesContext } from "../hooks/useRolesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import RoleDetails from "../components/RoleDetails";
import RoleForm from "../components/RoleForm";
import SubroleForm from "../components/SubroleFrom";

const AddSubrole = () => {
  const { roles, dispatch } = useRolesContext();
  const { user } = useAuthContext();

  return (
    <div className="home">
      <SubroleForm />
    </div>
  );
};

export default AddSubrole;
