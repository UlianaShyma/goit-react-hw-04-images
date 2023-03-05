import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ items }) => {
  return (
    <ImageGalleryList>
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};
