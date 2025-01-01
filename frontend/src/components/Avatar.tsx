import React from 'react'

interface AvatarProps{
    name : string
}

export const Avatar = ({name} : AvatarProps) => {
  return (
    <div className='w-12  h-12 rounded-full bg-blue-500 text-white flex justify-center'>
        <div className='flex flex-col justify-center'>
          <div>{name.toUpperCase()[0]}</div>  
        </div>
      
    </div>
  )
}
