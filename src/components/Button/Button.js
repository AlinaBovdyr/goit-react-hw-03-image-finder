import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onBtnClick }) => {
  return (
    <button type="button" className={s.Button} onClick={onBtnClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onBtnClick: PropTypes.func,
};

export default Button;
