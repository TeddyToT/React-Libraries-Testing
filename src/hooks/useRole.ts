import type { Role } from "../types/types";

let role: Role = (localStorage.getItem("role") as Role) || null;

const setRole = (newRole: Role) => {
  role = newRole;
  localStorage.setItem("role", newRole ?? "");
};

const getRole = (): Role => {
  return role;
};

const clearRole = () => {
  localStorage.removeItem("role");
};

export default { setRole, getRole, clearRole };
