import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = query => {
    this.setState({
      searchQuery: query,
    });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={searchQuery} />
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}

export default App;
