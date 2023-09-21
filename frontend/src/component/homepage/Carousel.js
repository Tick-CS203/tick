import { useState } from 'react'
import { CgChevronRight, CgChevronLeft } from 'react-icons/cg';
import { RxDotFilled } from 'react-icons/rx';

export const Carousel = ({ images }) => { // Accept 'images' as a prop
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (imageIndex) => {
    setCurrentIndex(imageIndex);
  };

  return (
    <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <CgChevronLeft onClick={prevImage} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <CgChevronRight onClick={nextImage} size={30} color='white'/>
      </div>

      <div className='flex top-4 justify-center py-2'>
        {images.map((image, imageIndex) => (
          <div
            key={imageIndex}
            onClick={() => goToImage(imageIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled/>
          </div>
        ))}
      </div>
    </div>
  );
}

