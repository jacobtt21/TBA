import React, { useState, useEffect } from 'react';
import { IoChevronForward } from "react-icons/io5";

export default function ImageCard({ card }) {

  return  (
    <div className='container mt-4 flow-root items-center bg-gray-200 rounded-lg'>
      <img src={card} className="rounded object-fill w-full"/>
    </div>
  )
}