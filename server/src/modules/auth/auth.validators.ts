import { z } from "zod"



const login = z.object({
  email: z.string({ required_error: 'Email is required!' }).email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required!' }).min(6, { message: 'Password must have atleast 6 characters' }),
})

const register = z.object({
  name: z.string({ required_error: 'Name is required!' }).min(3, { message: 'Name must have atleast 3 characters' }),
  email: z.string({ required_error: 'Email is required!' }).email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required!' }).min(6, { message: 'Password must have atleast 6 characters' }),
  username: z.string({ required_error: 'Username is required!' }).min(5, { message: 'Username must have atleast 5 characters' }),
})

const authValidators = { login, register }
export default authValidators