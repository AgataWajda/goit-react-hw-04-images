import { Component } from 'react';

export class Searchbar extends Component {
  handleSubmit = event => {
    const form = event.currentTarget;
    const input = form.elements.input.value;
    event.preventDefault();
    this.props.handleSearch(input);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            name="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
