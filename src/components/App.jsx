import { Component } from 'react';

import { Searchbar } from './Searchbar';
import getItems from '../services/pixabyAPI';

export class App extends Component {
  fetchData = querry => {
    console.log(getItems(querry));
  };

  render() {
    return (
      <div>
        <Searchbar handleSearch={this.fetchData}></Searchbar>
      </div>
    );
  }
}
