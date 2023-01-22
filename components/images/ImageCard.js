import React, { useContext } from 'react';
import { bDayCardContext, bDayCardNextContext, msgContext } from '../../lib/UserContext';

export default function ImageCard({ card }) {
  const [, setChosenCard] = useContext(bDayCardContext)
  const [, setCardSlide] = useContext(bDayCardNextContext)
  const [, setMsgSlide] = useContext(msgContext)

  const changeCard = () => {
    setChosenCard(card["url"])
    setCardSlide(false)
    setTimeout(function(){
      setMsgSlide(true)
    }, 500);
  }

  return  (
    <div className='container shadow mt-4 flow-root items-center bg-gray-200 rounded-lg' onClick={changeCard}>
      <img src={card["url"]} className="rounded object-fill w-full"/>
    </div>
  )
}