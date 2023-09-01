const Role_Permission = require('../models/role_permission');
const Permission = require('../models/permission');

const checkPermission = async (role_id, group, resource) => {
  const permission = await Permission.findOne({
    where: { group, name: resource },
    raw: true,
  });

  const role_permission = await Role_Permission.findOne({
    where: { role_id, permission_id: permission.id },
  });

  return !!role_permission;
};
module.exports = { checkPermission };
