import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(({ id, webformatURL, tags }) => {
        return (
          <li key={id} className={s.GalleryItem}>
            <img src={webformatURL} alt={tags} className={s.GalleryItemImage} />
          </li>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
