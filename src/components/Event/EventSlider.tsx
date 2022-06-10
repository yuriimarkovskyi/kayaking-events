import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/useAppSelector';

function EventSlider() {
  const { link } = useParams();

  const events = useAppSelector((state) => state.events);
  const currentEvent = events.filter((el) => el.link === link);

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
      {currentEvent.map((el) => el.imagesSlider.map((image) => (
        <SplideSlide key={image}>
          <img src={image} alt="" className="event-slider__image" />
        </SplideSlide>
      )))}
    </Splide>
  );
}

export default EventSlider;
