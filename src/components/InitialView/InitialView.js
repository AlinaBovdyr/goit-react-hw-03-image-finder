import React from 'react';
import PropTypes from 'prop-types';
import s from './InitialView.module.css';

const InitialView = ({ text }) => {
  return <p className={s.text}>{text}</p>;
};

InitialView.propTypes = {
  text: PropTypes.string,
};

export default InitialView;
