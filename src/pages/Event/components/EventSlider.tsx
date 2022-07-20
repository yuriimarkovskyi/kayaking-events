import { Splide, SplideSlide } from '@splidejs/react-splide';
import { storage } from 'config/firebase';
import { ref } from 'firebase/storage';
import useFirebaseStorage from 'hooks/useFirebaseStorage';
import React from 'react';
import { useParams } from 'react-router-dom';

function EventSlider() {
  const { link } = useParams();

  const sliderImagesRef = ref(storage, `images/events/slider/${link}`);
  const slides = useFirebaseStorage(sliderImagesRef);

  return (
    <Splide
      tag="section"
      options={{
        type: 'fade',
        speed: 1000,
        heightRatio: 0.6,
        arrows: false,
        lazyLoad: 'sequential',
        wheel: true,
        waitForTransition: true,
        cover: true,
      }}
    >
      {slides.map((slide, index) => (
        <SplideSlide key={slide + index.toString()}>
          <img
            src={slide}
            data-splide-lazy={slide}
            alt=""
          />
        </SplideSlide>
      ))}
    </Splide>
  );
}

export default EventSlider;
