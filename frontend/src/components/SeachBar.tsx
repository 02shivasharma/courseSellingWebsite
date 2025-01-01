import React from 'react'

interface SearchBarProps{
    onChangeHandler : (e : React.ChangeEvent<HTMLInputElement>) => void,
    onClickHandler : (e : React.MouseEvent<HTMLElement>) => void 
}

export const SeachBar = ({onChangeHandler , onClickHandler} : SearchBarProps) => {
  return (
    <div>
        <input className='h-12 rounded-lg border border-slate-400' onChange={onChangeHandler}>
        </input>
        <button className='h-12 px-4 py-1 bg-blue-400 text-white rounded-md' onClick={onClickHandler}>Search</button>
    </div>
  )
}
