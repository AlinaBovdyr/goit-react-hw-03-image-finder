import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
    page: 0,
  };

  handleInputChange = event => {
    const { value } = event.target;

    this.setState({
      searchQuery: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      return toast.error('Please, enter your search query!');
    }

    this.props.onSubmit(searchQuery);

    this.setState({
      searchQuery: '',
    });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.SearchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
