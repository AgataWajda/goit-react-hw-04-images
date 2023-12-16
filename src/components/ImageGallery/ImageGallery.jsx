import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ gallery, showModal }) => {
  return (
    <ul className={css.gallery}>
      {gallery.map((item, index) => {
        return (
          <ImageGalleryItem
            item={item}
            key={index}
            showModal={showModal}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.func.isRequired,
};
