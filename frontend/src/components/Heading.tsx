import React from 'react'

interface HeadingProps{
    label : string
}

export const Heading = ({label} : HeadingProps) => {
  return (
    <div className='font-bold text-4xl p-6 '>{label}</div>
  )
}