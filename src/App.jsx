import React, { Component } from 'react';
import { fetchImagesWithQuery } from './services/APIservice';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Searchbar } from './components/Searchbar/Searchbar';
import { Loader } from './components/Loader/Loader';
import { Button } from './components/Button/Button';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    query: null,
    page: 1,
    // totalPages: null,
    loading: false,
    error: null,
  };
  async uploadImages(query, page) {
    try {
      this.setState({ loading: true });
      const result = await fetchImagesWithQuery(query, page);
      console.log('result', result);
      console.log('page', page);

      this.setState(({ images }) => ({
        images: [...images, ...result],
        loading: false,
      }));
      if (result.length === 0) {
        toast.error(
          "Sorry, we can't find anyting for your request. Please try again."
        );
        return;
      }
    } catch (error) {
      this.setState({
        error: toast.error('Sorry, something went wrong, the server is down.'),
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.uploadImages(query, page);
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    const input = event.target.elements.search;
    //  console.log('event', event.target.elements.search);
    const value = input.value.trim();
    if (value === '') {
      toast.error("You didn't enter anything!");
      return;
    }

    this.setState({
      images: [],
      query: value,
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading } = this.state;
    // console.log('this.state ', this.state);
    const notEmpty = images.length !== 0;
    const notEndList = images.length >= 12;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ToastContainer autoClose={2000} />
        {notEmpty && <ImageGallery images={images} />}
        {loading ? (
          <Loader />
        ) : (
          notEmpty && notEndList && <Button onClick={this.loadMore} />
        )}
      </>
    );
  }
}
