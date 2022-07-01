import { Splide, SplideSlide } from '@splidejs/react-splide';
import { storage } from 'config/firebase';
import { ref } from 'firebase/storage';
import useFirebaseStorage from 'hooks/useFirebaseStorage';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

function EventSlider() {
  const { link } = useParams();

  const sliderImagesRef = ref(storage, `images/slider/${link}`);
  const slides = useFirebaseStorage(sliderImagesRef);

  return (
    <Splide
      className="event-slider"
      options={{
        type: 'loop',
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 3000,
      }}
    >
      {slides.map((slide) => (
        <SplideSlide key={slide}>
          <img src={slide} alt="" className="event-slider__image" />
        </SplideSlide>
      ))}
    </Splide>
  );
}

export default memo(EventSlider);
