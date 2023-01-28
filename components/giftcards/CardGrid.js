import React, { useEffect, useState } from 'react';

export default function GiftCardGrid() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {

  }

  return (
    <div className="w-11/12 md:w-1/2 mx-auto grid grid-cols-2 gap-4">
      <h1>hi</h1>
    </div>
  )
}