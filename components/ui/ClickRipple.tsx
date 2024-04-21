"use client"
import React from 'react'

export default function ClickRipple({ className }: { className?: any }) {
  const [xy, setXy] = React.useState({
    x: 0,
    y: 0,
    display: "none",
  })
  function handleClick(e: any) {
    const { offsetX, offsetY } = e.nativeEvent;
    setXy({
      x: offsetX,
      y: offsetY,
      display: "flex",
    })
    setTimeout(() => {
      setXy({
        x: offsetX,
        y: offsetY,
        display: "none",
      })
    }, 500)
  }
  return (
    <div className='absolute top-0 left-0 bottom-0 right-0' onClick={handleClick} >
      <span style={{ top: xy.y, left: xy.x, display: xy.display }} className='absolute rounded-full bg-black opacity-[0.1] size-[50px] translate-x-[-50%] translate-y-[-50%] animate-ripple'>
      </span>
    </div>
  )
}

