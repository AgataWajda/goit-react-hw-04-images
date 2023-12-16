import { useEffect, useState } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import getItems from '../services/pixabyAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [pageToLoad, setPageToLoad] = useState(1);
  const [querry, setQuerry] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [prevPage, setPrevPage] = useState();

  useEffect(() => {
    if (querry !== '' && prevPage !== pageToLoad) {
      setIsLoading(true);
      getItems(querry, pageToLoad)
        .then(response => {
          if (response.data.totalHits > 12 * pageToLoad) {
            setLoadMore(true);
          } else {
            setLoadMore(false);
          }
          return response.data.hits;
        })
        .then(items => {
          pageToLoad === 1
            ? setGalleryItems(items)
            : setGalleryItems(galleryItems => [...galleryItems, ...items]);

          setIsLoading(false);
          setPrevPage(pageToLoad);
        })
        .catch(error => {
          setErrorMsg(error);
        });
    }
  }, [galleryItems, pageToLoad, querry, prevPage]);

  const fetchData = newQuerry => {
    if (newQuerry !== querry) {
      setPageToLoad(1);
      setQuerry(newQuerry);
      setPrevPage(0);

      setIsLoading(true);
    }
  };

  const getMoreData = () => {
    setPageToLoad(pageToLoad => pageToLoad + 1);
  };

  const openModal = (image, tags) => {
    setImage(image);
    setTags(tags);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar handleSearch={fetchData}></Searchbar>
      {isLoading && <Loader />}
      {!errorMsg && (
        <ImageGallery
          gallery={galleryItems}
          showModal={openModal}
        ></ImageGallery>
      )}
      {loadMore && !isLoading && <Button loadMore={getMoreData}></Button>}
      {showModal && <Modal alt={tags} image={image} exit={closeModal}></Modal>}
    </div>
  );
};
