import React, { Component } from 'react';
import { fetchImagesWithQuery } from './APIservice';
// import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    // query: null,
    query: 'art', //test
    page: 1,
    totalPages: null,
    loading: false,
  };
  async componentDidMount(_, prevState) {
    const { query, page } = this.state;
    const res = await fetchImagesWithQuery(query, page);

    this.setState(({ images }) => ({
      images: [...images, ...res.hits],
    }));
  }
  render() {
    const { images } = this.state;
    return (
      <>
        <div>React homework template</div>
        <ImageGallery images={images} />
      </>
    );
  }
}
