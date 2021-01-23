import React, { Component } from 'react';
import imageAPI from '../../services/searchImgApi';
import ImageGallery from '../ImageGallery';
import Button from '../Button';

export default class ImageInfo extends Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
    page: 1,
    showBtn: true,
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const prevImages = prevState.images;

    if (prevImages.length > 0) {
      const listRef = document.querySelector('ul');
      const { bottom } = listRef.getBoundingClientRect();
      const PAD = 48;
      const position = document.body.clientHeight - (bottom / 4 + PAD);
      return position;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;

    if (prevQuery !== currentQuery) {
      this.setState({
        status: 'pending',
        images: [],
        page: 1,
        showBtn: true,
      });

      this.fetchImages();
    } else {
      if (snapshot !== null) {
        window.scrollTo({
          top: snapshot,
          behavior: 'smooth',
        });
      }
    }
  }

  fetchImages = () => {
    const currentQuery = this.props.query;
    const currentPage = this.state.page;

    imageAPI
      .fetchImage(currentQuery, currentPage)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return Promise.reject(
            new Error(`Bad search query :( We have no ${currentQuery} images`),
          );
        }

        if (hits.length < 12) {
          this.setState({ showBtn: false });
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  render() {
    const { images, status, error, showBtn } = this.state;

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
          <ImageGallery hits={images} />
          {showBtn && <Button onBtnClick={this.fetchImages} />}
        </>
      );
    }
  }
}
