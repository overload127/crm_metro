import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

import TPTable from './TPTable/TPTable';
import FormTPRequest from './FormTPRequest/FormTPRequest';


function DisplayTP({ isLoadingWiki, TPWorks, stations, okolotoks, users, techCards, currentUser, onLoadTPWorkData, onDeleteTPWorkData }) {
  return (
    <div>
      <FormTPRequest isLoadingWiki={isLoadingWiki} TPWorksisLoading={TPWorks.isLoading} stations={stations} okolotoks={okolotoks} users={users} techCards={techCards} onLoadTPWorkData={onLoadTPWorkData} />
      <TPTable TPWorks={TPWorks} currentUser={currentUser} onDeleteTPWorkData={onDeleteTPWorkData} />
    </div>
  );
}

DisplayTP.propTypes = {
  isLoadingWiki: PropTypes.bool.isRequired,
  TPWorks: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          datetimeStart: PropTypes.instanceOf(moment).isRequired,
          datetimeEnd: PropTypes.instanceOf(moment).isRequired,
          note: PropTypes.string.isRequired,
          subdivision: PropTypes.string.isRequired,
          stationName: PropTypes.string.isRequired,
          techCardsCode: PropTypes.string.isRequired,
          users: PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
          }).isRequired,
          okolotokName: PropTypes.string.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,
  stations: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          shortName: PropTypes.string.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,
  okolotoks: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,
  users: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          firstName: PropTypes.string.isRequired,
          profileId: PropTypes.number.isRequired,
          okolotokId: PropTypes.number.isRequired,
          okolotokName: PropTypes.string.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,
  techCards: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          code: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          du46: PropTypes.bool.isRequired,
          order: PropTypes.bool.isRequired,
          devicesForWork: PropTypes.oneOfType([
            PropTypes.arrayOf(
              PropTypes.string).isRequired,
            PropTypes.array.isRequired,
          ]).isRequired,
        })).isRequired,
    ]).isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    okolotok: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    userProfileId: PropTypes.number.isRequired,
  }).isRequired,
  onLoadTPWorkData: PropTypes.func.isRequired,
  onDeleteTPWorkData: PropTypes.func.isRequired,
};

DisplayTP.defaultProps = {
};

export default DisplayTP;