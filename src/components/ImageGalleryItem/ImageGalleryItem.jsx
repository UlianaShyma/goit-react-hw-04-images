import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItems,
  ImageGalleryItemImg,
  ImgInModal,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  const { webformatURL, largeImageURL } = item;

  return (
    <ImageGalleryItems>
      <ImageGalleryItemImg src={webformatURL} onClick={openModal} />
      {modalOpen && (
        <Modal onClose={onCloseModal} modalOpen={modalOpen}>
          <ImgInModal src={largeImageURL} />
        </Modal>
      )}
    </ImageGalleryItems>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
};
