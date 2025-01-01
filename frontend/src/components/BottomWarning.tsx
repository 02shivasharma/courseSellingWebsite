import React from 'react'
import {Link} from 'react-router-dom'

interface BottomWarningProps{
    label : string,
    buttonText : string,
    to : string
}

export const BottomWarning = ({label,buttonText, to} : BottomWarningProps) => {
  return (
    <div className='py-2 text-sm font-medium flex justify-center'>
     <div>
     {label}
     </div>
     <Link className='pointer underline pl-1 cursor-pointer ' to={to}>{buttonText}</Link>
    </div>
  )
}