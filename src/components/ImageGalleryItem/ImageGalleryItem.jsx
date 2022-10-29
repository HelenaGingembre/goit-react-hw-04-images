import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import { Image } from 'components/Modal/Modal.styled';

export const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <GalleryItem onClick={toggleModal}>
        <GalleryImage src={webformatURL} alt={tags} />
      </GalleryItem>
      {showModal && (
        <Modal toggle={toggleModal} image={largeImageURL} tags={tags}>
          <Image src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
