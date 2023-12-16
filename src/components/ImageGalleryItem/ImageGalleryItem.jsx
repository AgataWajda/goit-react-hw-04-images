import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, showModal }) => {
  const { webformatURL, tags } = item;

  return (
    <li className={css.item} onClick={() => showModal(webformatURL, tags)}>
      <img className={css.image} src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};
