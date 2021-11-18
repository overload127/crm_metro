import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Progress } from 'antd';


export default function ProgressBar({ initLodding, onEndBarInit }) {
  const { isLoading, countStep, currentStep, status } = initLodding;
  if(!isLoading) {
    return null;
  }

  useEffect(() => {
    if(countStep === currentStep) {
      setTimeout(() => onEndBarInit(), 2000);
    }
  }, [currentStep]);
  // active
  // exception
  const currentProgress = (currentStep) ? 100 / countStep * currentStep : 0;
  return (
    <span>Загрузка приложения <Progress percent={currentProgress.toFixed(2)} steps={countStep} status={status} /></span>
  );
}

ProgressBar.propTypes = {
  initLodding: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    countStep: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onEndBarInit: PropTypes.func.isRequired,
};

ProgressBar.defaultProps = {
};

// function mapStateToProps( state, props ) {
//   return {
//     isAuth: state.auth.isAuth,
//     props
//   };
// }


// export default connect(mapStateToProps, null)(PrivateButton);