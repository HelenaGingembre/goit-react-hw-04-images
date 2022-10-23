import React, { Component } from 'react';
import { fetchImagesWithQuery } from './APIservice';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import 'react-toastify/dist/ReactToastify.css';
// import { Button } from './Searchbar/Searchbar.styled';

export class App extends Component {
  state = {
    images: [],
    query: null,
    page: 1,
    totalPages: null,
    loading: false,
  };

  //якщо ставлю  async componentDidMount - то відразу рендеряться картинки
  async componentDidUpdate(_, prevState) {
    const { query, page, totalPages, images } = this.state;

    if (prevState.page !== page && page !== 1) {
      this.setState({ loading: true });

      const result = await fetchImagesWithQuery(query, page);

      this.setState(({ images }) => ({
        images: [...images, ...result.hits],
        loading: false,
      }));

      if (page >= totalPages && images !== prevState.images) {
        toast.error("Sorry, but you've reached the end of search results.");
      }
    }
  }
  onSubmit = async event => {
    event.preventDefault();
    const input = event.target.elements.search;
    console.log('event', event.target.elements.search);
    const value = input.value.trim();
    const page = 1;

    if (value === '') {
      toast.error("You didn't enter anything!");
      return;
    }

    const result = await fetchImagesWithQuery(value, page);

    if (result.hits.length === 0) {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const totalPages = Math.floor(result.totalHits / 12);

    this.setState({
      images: result.hits,
      query: value,
      page,
      totalPages: totalPages,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading, totalPages, page } = this.state;
    const notEmpty = images.length !== 0;
    const notEndList = page < totalPages;

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
