import React, { Component } from 'react';
import { fetchImagesWithQuery } from './APIservice';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    query: null,
    // query: 'dog', //test
    page: 1,
    totalPages: null,
    loading: false,
  };

  //якщо ставлю  async componentDidMount - то відразу рендеряться картинки
  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    const res = await fetchImagesWithQuery(query, page);

    this.setState(({ images }) => ({
      images: [...images, ...res.hits],
    }));
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

    const res = await fetchImagesWithQuery(value, page);

    if (res.hits.length === 0) {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const totalPages = Math.floor(res.totalHits / 12);

    this.setState({
      images: res.hits,
      query: value,
      page,
      totalPages: totalPages,
    });
  };
  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ToastContainer autoClose={2000} />
        <div>React homework template</div>
        <ImageGallery images={images} />
      </>
    );
  }
}
