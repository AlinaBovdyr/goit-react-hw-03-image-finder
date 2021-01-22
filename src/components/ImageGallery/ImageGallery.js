import React, { Component } from 'react';
import imageAPI from '../../services/searchImgApi';
import ImageGalleryItem from './ImageGalleryItem';
import Button from '../Button';

import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: null,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;

    if (prevQuery !== currentQuery) {
      this.setState({
        status: 'pending',
      });

      imageAPI
        .fetchImage(currentQuery)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return Promise.reject(
              new Error(
                `Bad search query :( We have no ${currentQuery} images`,
              ),
            );
          }

          this.setState({
            images: hits,
            status: 'resolved',
          });
        })
        .catch(error =>
          this.setState({
            error,
            status: 'rejected',
          }),
        );
    }
  }

  render() {
    const { images, status, error } = this.state;

    if (status === 'idle') {
      return <p>Enter in the searchbar the images you want to search</p>;
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem images={images} />
          </ul>
          <Button />
        </>
      );
    }
  }
}
