import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

function EventSlider({ link }) {
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.link === link);

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
      {currentEvent.map((item) => item.images.map((image) => (
        <SplideSlide key={image}>
          <img src={image} alt="" className="event-slider__image" />
        </SplideSlide>
      )))}
    </Splide>
  );
}

EventSlider.propTypes = {
  link: PropTypes.string.isRequired,
};

export default EventSlider;
