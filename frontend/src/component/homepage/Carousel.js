import { useState, useEffect } from 'react';
import "./Carousel.css"
import { useCallback } from 'react';

export const Carousel = ({ images }) => { // Accept 'images' as a prop
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImageIndex = (currentIndex - 1 + images.length) % images.length;
  const nextImageIndex = (currentIndex + 1) % images.length;

  const nextImage = () => {
    setCurrentIndex(nextImageIndex);
  };

  const getNextImage = useCallback(() => nextImage(), [nextImage])

  const prevImage = () => {
    setCurrentIndex(prevImageIndex);
  };

  const goToImage = (imageIndex) => {
    setCurrentIndex(imageIndex);
  };

  // Auto-scroll interval (change image every 3 seconds)
  useEffect(() => {
    const interval = setInterval(getNextImage, 3500);
    return () => clearInterval(interval);
  }, [currentIndex, getNextImage]);

  return (
    <div>
      <div className='max-w-[1400px] h-[400px] w-full m-auto pt-4 relative group carousel-container'>

        {/* Right Panel */}
        <div
          style={{ backgroundImage: `url(${images[prevImageIndex]})` }}
          className='w-1/6 h-full bg-center bg-cover duration-500 mr-10 cursor-pointer'
          onClick={prevImage}>
        </div>

        <div
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
          className='w-5/6 h-full justify-center bg-center bg-cover duration-500'
        ></div>

        {/* Left Panel */}
        <div
          style={{ backgroundImage: `url(${images[nextImageIndex]})` }}
          className='w-1/6 h-full bg-center bg-cover duration-500 ml-10 cursor-pointer'
          onClick={nextImage}>
        </div>

      </div>


      <div className='flex top-4 justify-center py-4 '>
        {images.map((image, imageIndex) => (
          <div
            key={imageIndex}
            onClick={() => goToImage(imageIndex)}
            className={`carousel-dot ${imageIndex === currentIndex ? 'active-dot' : ''
              }`}
          >
          </div>
        ))}
      </div>
    </div>
  );
}