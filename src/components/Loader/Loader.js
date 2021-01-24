import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

const LoaderImg = () => {
  return (
    <Loader
      className={s.loader}
      type="ThreeDots"
      color="#b53f97"
      height={100}
      width={200}
      timeout={3000}
    />
  );
};

export default LoaderImg;
