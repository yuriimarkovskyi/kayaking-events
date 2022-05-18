import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EventSlider() {
  const { link } = useParams();
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((el) => el.link === link);

  return (
    <Splide
      className="event-slider"
      options={{
        type: 'loop',
        arrows: false,
        pagination: true,
        autoplay: true,
        interval: 3000,
        breakpoints: {
          1199: {
            pagination: false,
          },
        },
        classes: {
          pagination: 'splide__pagination event-slider__pagination slider-pagination',
          page: 'splide__pagination__page slider-pagination__bullet',
        },
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
