import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGalleryItem = ({ url, largeImageURL, description, onImgClick }) => {
  return (
    <li className={s.GalleryItem}>
      <img
        src={url}
        data-source={largeImageURL}
        alt={description}
        className={s.GalleryItemImage}
        onClick={e => onImgClick(e.currentTarget)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  largeImageURL: PropTypes.string,
  description: PropTypes.string,
  onImgClick: PropTypes.func,
};

export default ImageGalleryItem;
