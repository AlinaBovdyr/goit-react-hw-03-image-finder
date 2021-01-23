import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGalleryItem = ({ url, description }) => {
  return (
    <li className={s.GalleryItem}>
      <img src={url} alt={description} className={s.GalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  description: PropTypes.string,
};

export default ImageGalleryItem;
