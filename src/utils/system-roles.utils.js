// system roles (admin and volunteers)
export const systemRoles = {
  ADMIN: "admin",
  VOLUNTEERS: "volunteers",

};

const { ADMIN, VOLUNTEERS } = systemRoles;
// Cases of roles
export const roles = {
  ADMIN_VOLUNTEERS: [ADMIN, VOLUNTEERS],
  ADMIN: [ADMIN],
  VOLUNTEERS: [VOLUNTEERS],
};
