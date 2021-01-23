import React, { Component } from 'react';
import imageAPI from '../../services/searchImgApi';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import LoaderImg from '../Loader';
import InitialView from '../InitialView';
import ErrorView from '../ErrorView';

export default class ImageInfo extends Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
    page: 1,
    showBtn: true,
    loading: false,
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const prevImages = prevState.images;

    if (prevImages.length > 0) {
      const listRef = document.querySelector('ul');
      const { bottom } = listRef.getBoundingClientRect();
      const position = document.body.clientHeight - bottom + bottom / 8;
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
      if (snapshot !== null && prevState.page > 2) {
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

    this.setState({ loading: true });

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
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { images, status, error, showBtn, loading } = this.state;

    if (status === 'idle') {
      return (
        <InitialView text="Enter in the searchbar the images you want to search" />
      );
    }

    if (status === 'pending') {
      return <LoaderImg />;
    }

    if (status === 'rejected') {
      return <ErrorView text={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery hits={images} />
          {showBtn && !loading && <Button onBtnClick={this.fetchImages} />}
          {loading && <LoaderImg />}
        </>
      );
    }
  }
}