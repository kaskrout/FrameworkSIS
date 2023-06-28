import { useEffect } from "react";
import { useRolesContext } from "../hooks/useRolesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import RoleDetails from "../components/RoleDetails";
import RoleForm from "../components/RoleForm";

const Role = () => {
  const { roles, dispatch } = useRolesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await fetch("/api/role", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ROLES", payload: json });
      }
    };

    if (user) {
      fetchRoles();
    }
  }, [dispatch, user, roles]);

  return (
    <div className="home">
      <div className="workouts">
        {roles &&
          roles.map((role) => <RoleDetails key={role._id} role={role} />)}
      </div>
      <RoleForm />
    </div>
  );
};

export default Role;
