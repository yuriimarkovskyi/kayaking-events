import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useParams } from 'react-router-dom';
import { ref } from 'firebase/storage';
import { storage } from 'config/firebase';
import useFirebaseStorage from 'hooks/useFirebaseStorage';

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

export default EventSlider;
