import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   label: string
   name: string
   errors?: string[]
}

export default function InputField({ label, name, errors, ...rest }: Props) {
   return (
      <div>
         <label htmlFor={name} className="text-gray-600 mb-2 block">
            {label}
         </label>
         <input
            {...rest}
            name={name}
            id={name}
            className={`block w-full border  px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${errors ? 'border-red-500' : 'border-gray-300'}`}
         />
         {errors && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors[0]}</p>
         )}
      </div>
   )
}
