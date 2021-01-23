import React from 'react';
import PropTypes from 'prop-types';
import errorImage from './error.jpeg';
import s from './ErrorView.module.css';

const ErrorView = ({ text }) => {
  return (
    <>
      <img className={s.errorImg} src={errorImage} alt="sadcat" />
      <p className={s.errorMessage}>{text}</p>
    </>
  );
};

ErrorView.propTypes = {
  text: PropTypes.string,
};

export default ErrorView;
