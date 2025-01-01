import React from 'react'

interface SubHeadingProps{
    label : string
}
export const SubHeading = ({label} : SubHeadingProps) => {
  return (
    <div className='text-slate-500 text-md pt-1 pb-4 px-4'>{label}</div>
  )
}