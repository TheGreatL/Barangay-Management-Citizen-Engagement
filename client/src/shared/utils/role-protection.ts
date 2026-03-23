import type { TUser } from '@/shared/stores/auth.store'

export type TUserRole = 'citizen' | 'barangay_official' | 'admin'

export const roleHierarchy: Record<TUserRole, number> = {
  citizen: 0,
  barangay_official: 1,
  admin: 2,
}

export function hasRole(
  user: TUser | null,
  role: TUserRole | TUserRole[],
): boolean {
  if (!user) return false

  const roles = Array.isArray(role) ? role : [role]
  return roles.includes(user.role as TUserRole)
}

export function canAccess(
  user: TUser | null,
  requiredRole: TUserRole,
): boolean {
  if (!user) return false

  const userHierarchy = roleHierarchy[user.role as TUserRole] || 0
  const requiredHierarchy = roleHierarchy[requiredRole] || 0

  return userHierarchy >= requiredHierarchy
}
