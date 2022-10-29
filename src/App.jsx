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
    loading: false,
    error: null,
    showLoadMore: true,
  };

  controlLastPage = ({ totalPage, page }) => {
    const isLastPage = page >= totalPage;
    if (page === 1 && !isLastPage) {
      this.setState({ showLoadMore: true });
    } else if (isLastPage) {
      this.setState({ showLoadMore: false });
      toast.error('This is last page.');
    }
  };

  async uploadImages(query, page) {
    try {
      this.setState({ loading: true });
      const dateFromApi = await fetchImagesWithQuery(query, page);
      const totalPage = Math.ceil(dateFromApi.totalHits / 12);

      console.log('totalPage:', totalPage);
      console.log('page', page);

      this.controlLastPage({ totalPage, page });

      const result = dateFromApi.hits.map(img => {
        const { id, largeImageURL, webformatURL, tags } = img;
        return {
          id,
          largeImageURL,
          webformatURL,
          tags,
        };
      });

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

  onFormSubmit = data => {
    console.log('data', data);
    const value = data;
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
    const { images, loading, showLoadMore } = this.state;
    const notEmpty = images.length !== 0;
    const notEndList = showLoadMore === true;

    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />
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
