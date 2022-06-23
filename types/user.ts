import { Role } from './permission'

export interface MeInterface {
  email: string
  name: string
  roles: Role[]
  id: string
}

export type UserType = MeInterface
