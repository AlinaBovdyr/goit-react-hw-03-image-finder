import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ hits, onClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {hits.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            largeImageURL={largeImageURL}
            description={tags}
            onImgClick={onClick}
          />
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
