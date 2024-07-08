import { z } from 'zod'

export const registerSchemaEn = z.object({
   name: z
      .string()
      .min(1, { message: 'Name is required*' })
      .max(30, { message: 'Max character for name is 30*' }),
   email: z
      .string()
      .min(1, { message: 'Email is required*' })
      .email({ message: 'Invalid email address*' }),
   password: z
      .string()
      .min(5, { message: 'Password must be at least 5 character*' })
      .max(10, { message: "Password can't be more than 10 character" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/, {
         message: 'Password must contain letters and numbers',
      }),
   cPassword: z.string().min(1, { message: 'Confirm Password is required*' }),
   aggrement: z.literal('on', { message: 'Please check on our aggrement*' }),
})

export const registerSchemaBn = z.object({
   name: z
      .string()
      .min(1, { message: 'নাম আবশ্যক*' })
      .max(30, { message: 'নামের জন্য সর্বাধিক অক্ষর ৩০*' }),
   email: z
      .string()
      .min(1, { message: 'ইমেইল আবশ্যক*' })
      .email({ message: 'অবৈধ ইমেইল ঠিকানা*' }),
   password: z
      .string()
      .min(5, { message: 'পাসওয়ার্ড কমপক্ষে ৫ অক্ষরের হতে হবে*' })
      .max(10, { message: 'পাসওয়ার্ড ১০ অক্ষরের বেশি হতে পারবে না' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/, {
         message: 'পাসওয়ার্ডে অবশ্যই অক্ষর এবং সংখ্যা থাকতে হবে',
      }),
   cPassword: z.string().min(1, { message: 'পাসওয়ার্ড নিশ্চিত করুন*' }),
   aggrement: z.literal('on', {
      message: 'দয়া করে আমাদের শর্তাবলীতে সম্মতি দিন*',
   }),
})

export const loginSchemaEn = z.object({
   email: z
      .string()
      .min(1, { message: 'Email is required*' })
      .email({ message: 'Invalid email address*' }),
   password: z.string().min(1, { message: 'Password is required*' }),
})

export const loginSchemaBn = z.object({
   email: z
      .string()
      .min(1, { message: 'ইমেইল প্রয়োজন*' })
      .email({ message: 'অবৈধ ইমেইল ঠিকানা*' }),
   password: z.string().min(5, { message: 'পাসওয়ার্ড প্রয়োজন*' }),
})

export const addressSchema = z.object({
   firstName: z
      .string()
      .min(1, { message: 'First name is required*' })
      .max(20, { message: 'Max character for first name is 20*' }),
   lastName: z
      .string()
      .min(1, { message: 'Last name is required*' })
      .max(20, { message: 'Max character for last name is 20*' }),
   region: z
      .string()
      .min(1, { message: 'Region is required*' })
      .max(20, { message: 'Max character for region is 20*' }),
   address: z
      .string()
      .min(1, { message: 'Address is required*' })
      .max(40, { message: 'Max character for address is 40*' }),
   city: z
      .string()
      .min(1, { message: 'City is required*' })
      .max(20, { message: 'Max character for city is 20*' }),
   phone: z.string().regex(/^01[1-9][0-9]{8}$/, {
      message: 'Invalid Bangladeshi phone number',
   }),
   email: z
      .string()
      .min(1, { message: 'Email is required*' })
      .email({ message: 'Invalid email address*' }),
})
