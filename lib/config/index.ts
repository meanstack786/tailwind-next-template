import { IconType } from 'react-icons'
import { HiHome, HiUsers } from 'react-icons/hi'
export const logoAddress =
  'https://iph.href.lu/80x15?text=logo&fg=000000&bg=ffffff'

export enum SessionStorageKeys {
  DEEP_URL_KEY = 'DEEP_URL_KEY',
}

export type MenuName = 'dashboard' | 'accounts'

export const MenuConfigMap: Map<
  MenuName,
  { name?: string; Icon: IconType; router?: string }
> = new Map([
  ['dashboard', { Icon: HiHome, router: '/' }],
  ['accounts', { Icon: HiUsers, router: '/accounts' }],
])
type Role = 'super-admin' | 'admin' | 'member' | 'guest'

export const DefaultRoloPermissions: Set<Role> = new Set([
  'admin',
  'member',
  'super-admin',
])
