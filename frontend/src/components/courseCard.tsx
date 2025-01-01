import React from 'react'

interface CardProps{
    name : string
    price : string,
    description : string,
    
}

export const CourseCard = ({ name, price, description} : CardProps) => {
  return (
   <div  className="flex flex-col rounded-lg shadow-md bg-white max-w-md">
      <div className="w-full">
        logo 
      </div>
      <div className="p-4">
        <h2 className="text-black font-semibold text-xl text-center">{name}</h2>
        <p className="text-slate-500 text-center">{description}</p>
        <div className="flex justify-between mt-4">
          <span className="text-gray-700">{price}</span>
          <span className="text-green-500">33% off</span>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <button className="rounded bg-blue-500 text-white px-4 py-2">
          View Details
        </button>
      </div>
    </div>
  )
}
