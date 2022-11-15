import { useState, useContext } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import { Camera, CameraResultType } from '@capacitor/camera';

function Onboard() {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const user = useContext(UserContext);
  const userExtra = useContext(UserContextExtra);
  const [image, setImage] = useState('');

  async function handleSetUp(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        quality: 100,
      });
      setImage(image.dataUrl)
    } catch (e) {
      setLoading(false)
      setError(e.message)
    }
  }

  return user && userExtra ? (
    <form className="bg-white mt-24 p-8">
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center p-0">
          <span className="font-bold cursor-pointer text-4xl">
            Set Up Your Birthday App
          </span>
        </div>
      </div>
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center pt-8">
          <button
            disabled={loading}
            className="btn-yellow text-2xl"
            onClick={handleSetUp}
          >
            {loading ? 'Uploading ...' : 'Select an Image'}
          </button>
        </div>
      </div>
      {image && (
        <div className="container flex -mt-16 justify-center">
          <img
          src={image}
          className="pt-20 w-72"
          alt="..."
          />
        </div>
      )}
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center p-0">
          <p className="text-red-500 pt-10 font-bold">{error}</p>
        </div>
      </div>
    </form>
  ) : (
    <>
      hmm
    </>
  )
}

export default Onboard;
