"use client"
import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
export default function Loading() {
  return (
    <div className='flex justify-between items-center '>
    <ClimbingBoxLoader
  color="#36d7b7"
  cssOverride={{}}
/>
  </div>
  )
}

