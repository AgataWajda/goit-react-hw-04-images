import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import getItems from '../services/pixabyAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.getMoreData = this.getMoreData.bind(this);
  }

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

  fetchData(querry) {
    this.setState(() => ({
      querry: querry,
      isLoading: true,
      pageToLoad: 1,
    }));

    getItems(querry)
      .then(response => {
        if (response.data.totalHits > 12) {
          this.setState({ loadMore: true });
        } else {
          this.setState({ loadMore: false });
        }
        return response.data.hits;
      })
      .then(items => {
        this.setState(() => ({
          galleryItems: items,
          isLoading: false,
          pageToLoad: this.state.pageToLoad + 1,
        }));
      })

      .catch(err => {
        this.setState({ errorMsg: err.message });
        console.log(err);
      });
  }

  getMoreData() {
    this.setState({ pageToLoad: this.state.pageToLoad + 1 });

    getItems(this.state.querry, this.state.pageToLoad)
      .then(response => {
        if (response.data.totalHits > 12 * this.state.pageToLoad) {
          this.setState({ loadMore: true });
        } else {
          this.setState({ loadMore: false });
        }
        return response.data.hits;
      })
      .then(items =>
        this.setState({
          galleryItems: this.state.galleryItems.concat(items),
        })
      );
  }

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
