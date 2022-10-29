import React, { useEffect, useState } from 'react';
import { fetchImagesWithQuery } from './services/APIservice';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Searchbar } from './components/Searchbar/Searchbar';
import { Loader } from './components/Loader/Loader';
import { Button } from './components/Button/Button';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(true);

  const controlLastPage = ({ totalPage, page }) => {
    const isLastPage = page >= totalPage;
    if (page === 1 && !isLastPage) {
      setShowLoadMore(() => true);
    } else if (isLastPage) {
      setShowLoadMore(() => false);
      toast.error('This is last page.');
    }
  };

  useEffect(() => {
    if (query === '') return;

    const uploadImages = async (query, page) => {
      try {
        setLoading(() => true);
        const dateFromApi = await fetchImagesWithQuery(query, page);
        const totalPage = Math.ceil(dateFromApi.totalHits / 12);

        console.log('totalPage:', totalPage);
        console.log('page', page);

        controlLastPage({ totalPage, page });

        const result = dateFromApi.hits.map(img => {
          const { id, largeImageURL, webformatURL, tags } = img;
          return {
            id,
            largeImageURL,
            webformatURL,
            tags,
          };
        });

        if (result.length === 0) {
          toast.error(
            "Sorry, we can't find anyting for your request. Please try again."
          );
          return;
        } else {
          setImages(images => [...images, ...result]);
        }
        setLoading(() => false);
      } catch (error) {
        setError(
          error =>
            (error = toast.error(
              'Sorry, something went wrong, the server is down.'
            ))
        );
      } finally {
        setLoading(() => false);
      }
    };
    uploadImages(query, page);
  }, [query, page]);

  const onFormSubmit = data => {
    console.log('data', data);

    if (data === '') {
      toast.error("You didn't enter anything! Please try again.");
      return;
    }
    setImages(() => []);
    setQuery(() => data);
    setPage(() => 1);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onFormSubmit} />
      <ToastContainer autoClose={2000} />
      {images.length !== 0 && <ImageGallery images={images} />}
      {loading === true ? (
        <Loader />
      ) : (
        images.length !== 0 &&
        showLoadMore === true && <Button onClick={loadMore} />
      )}
    </>
  );
};
