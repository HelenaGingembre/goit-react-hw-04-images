import { Image, ModalContainer, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
// import * as basicLightbox from 'basiclightbox';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  handleKeyDown = event => {
    console.log('event.code:', event.code);

    if (event.code !== 'Escape') {
      return;
    }
    this.props.toggle();
  };

  clickOnBackdrop = event => {
    console.log('event.currentTarget', event.currentTarget);
    console.log('event.target', event.target);

    if (event.target === event.currentTarget) {
      this.props.toggle();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { image, tags } = this.props;

    //     const instance = basicLightbox.create(`
    //            <p>
    //             Your first lightbox with just a few lines of code.
    //             Yes, it's really that simple.
    //         </p>

    // `);

    return createPortal(
      <Overlay onClick={this.clickOnBackdrop}>
        <ModalContainer>
          <Image src={image} alt={tags} />
        </ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggle: PropTypes.func.isRequired,
  image: PropTypes.string,
  tags: PropTypes.string,
};
