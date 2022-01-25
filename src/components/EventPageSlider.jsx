import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const StyledEventPageSlider = styled(Splide)`
  @media (max-width: 1199px) {
    margin-bottom: 30px;
  }
  .pagination {
    display: flex;
    margin-top: 10px;
    column-gap: 5px;
  }

  .pagination-bullet {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: gray;

    &.is-active {
      background: black;
    }
  }

  .slide-image {
    width: 100%;
    border-radius: 10px;
  }
`;

function EventPageSlider({ name }) {
  const events = useSelector((state) => state.events.events);
  const currentEvent = events.filter((item) => item.name === name);

  return (
    <StyledEventPageSlider
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
          pagination: 'splide__pagination pagination',
          page: 'splide__pagination__page pagination-bullet',
        },
      }}
    >
      {currentEvent.map((item) => item.imagesSlider.map((image) => (
        <SplideSlide key={image}>
          <img className="slide-image" src={image} alt="" />
        </SplideSlide>
      )))}
    </StyledEventPageSlider>
  );
}

EventPageSlider.propTypes = {
  name: PropTypes.string.isRequired,
};

export default EventPageSlider;
