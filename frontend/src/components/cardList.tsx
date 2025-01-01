import React, { useEffect } from 'react'
import { CourseCard } from './courseCard'
import { useState } from 'react'
import axios from "axios"

interface Courses{
    id : number,
    name : string,
    price : string,
    description : string
}

export const CardList = () => {
  const [courses, setCourses] = useState<Courses[]>([]);

  const fetchCourses = async () => {
      const response = await axios.get("http://localhost:3000/api/user/courses", {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
      
      setCourses(response.data.courses)
      
  }
  
  useEffect(()=>{
      setTimeout(()=>{}, 1000)
      fetchCourses()
      console.log(courses)
  }, [])
  
  
  return (
    <div>
    {courses.length > 0 ? ( <div>
                         Courses
      <div className=" grid grid-cols-3 gap-4">
    {
         courses.map( course => (
            <div key={course.id}>
            <CourseCard name={course.name} price={course.price} description={course.description}  />
            </div>
        ))
    }
    </div>

    </div>) : (
        <p>Loading.....</p>
    )}
     </div>
    
  )
}
