import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import getItems from '../services/pixabyAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    galleryItems: [],
    isLoading: false,
    errorMsg: '',
    loadMore: false,
    pageToLoad: 1,
    querry: '',
    showModal: false,
    image: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { querry, pageToLoad } = this.state;

    if (
      this.state.querry !== prevState.querry ||
      this.state.pageToLoad !== prevState.pageToLoad
    ) {
      this.setState({ isLoading: true });
      getItems(querry, pageToLoad)
        .then(response => {
          if (response.data.totalHits > 12 * pageToLoad) {
            this.setState({ loadMore: true });
          } else {
            this.setState({ loadMore: false });
          }
          return response.data.hits;
        })
        .then(items => {
          this.state.pageToLoad === prevState.pageToLoad
            ? this.setState({ galleryItems: items })
            : this.setState({
                galleryItems: this.state.galleryItems.concat(...items),
              });

          this.setState({ isLoading: false });
        })
        .catch(error => {
          this.setState({ errorMsg: error });
        });
    }
  }

  fetchData = querry => {
    this.setState({ querry: querry, page: 1, isLoading: true });
  };

  getMoreData = () => {
    this.setState({ pageToLoad: this.state.pageToLoad + 1 });
  };

  openModal = (image, tags) => {
    this.setState(() => ({
      image: image,
      tags: tags,
      showModal: true,
    }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      isLoading,
      errorMsg,
      galleryItems,
      loadMore,
      showModal,
      tags,
      image,
    } = this.state;

    return (
      <div>
        <Searchbar handleSearch={this.fetchData}></Searchbar>
        {isLoading && <Loader />}
        {!isLoading && !errorMsg && (
          <ImageGallery
            gallery={galleryItems}
            showModal={this.openModal}
          ></ImageGallery>
        )}
        {loadMore && !isLoading && (
          <Button loadMore={this.getMoreData}></Button>
        )}
        {showModal && (
          <Modal alt={tags} image={image} exit={this.closeModal}></Modal>
        )}
      </div>
    );
  }
}
