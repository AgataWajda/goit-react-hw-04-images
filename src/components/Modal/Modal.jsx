import { Component } from 'react';

import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }
  handleCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.exit();
    }
  };

  render() {
    const { image, alt } = this.props;

    return (
      <div className={css.overlay} onClick={this.props.exit}>
        <div className={css.modal}>
          <img src={image} alt={alt} className={css.image} />
        </div>
      </div>
    );
  }
}
