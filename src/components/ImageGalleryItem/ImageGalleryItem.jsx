import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags } = this.props;

    return (
      <>
        <GalleryItem>
          <GalleryImage src={webformatURL} alt={tags} />
        </GalleryItem>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
