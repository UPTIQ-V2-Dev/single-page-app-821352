import { Role } from '../generated/prisma/index.js';

const allRoles = {
    [Role.USER]: [],
    [Role.ADMIN]: ['getUsers', 'manageUsers', 'manageContacts']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
