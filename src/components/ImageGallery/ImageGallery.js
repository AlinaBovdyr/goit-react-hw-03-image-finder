import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ hits }) => {
  return (
    <ul className={s.ImageGallery}>
      {hits.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGalleryItem key={id} url={webformatURL} description={tags} />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default ImageGallery;
