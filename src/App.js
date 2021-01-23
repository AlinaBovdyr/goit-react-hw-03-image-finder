import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Searchbar from './components/Searchbar';
import ImageInfo from './components/Views/ImageInfo';

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
        <ImageInfo query={searchQuery} />
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}

export default App;
