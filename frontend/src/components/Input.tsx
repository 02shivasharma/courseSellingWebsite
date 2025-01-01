import React from 'react'

interface InputProps{
    label : string,
    placeholder : string,
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
}
export const Input = ({label, placeholder, onChange} : InputProps) => {
  return (
    <div className='py-1 px-2'>
      <div className='text-sm font-medium text-left py-2 '>{label}</div>
      <input
       placeholder={placeholder}
       className='w-full px-2 py-1 border rounded border-slate-200'
       onChange={onChange}
      ></input>
    </div>
  )
}