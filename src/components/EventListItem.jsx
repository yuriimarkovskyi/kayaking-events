import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledEventListItem = styled(Link)`
  display: flex;
  flex-direction: column;
  flex-basis: 350px;
  padding: 10px;
  transition: 0.4s;
  border: 1px solid;

  &:hover {
    transform: scale(1.1);
  }

  .title {
    flex: 1 0 auto;
    margin-bottom: 10px;
    text-align: center;
  }

  .image {
    flex: 0 0 auto;
    width: 100%;
  }
`;

function EventListItem({ event }) {
  console.log(event);
  return (
    <StyledEventListItem to={`event/${event.name}`}>
      <h3 className="title">{event.title}</h3>
      <img src={event.image} alt="" className="image" />
    </StyledEventListItem>
  );
}

EventListItem.propTypes = {
  event: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default EventListItem;
