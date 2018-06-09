import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { photos: null };

  componentWillMount() {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=72157660115185712&user_id=137290658%40N08&format=json&nojsoncallback=1')
      .then(response => this.setState({ photos: response.data.photoset.photo }));
  }

  renderAlbums() {
    return this.state.photos.map(photo =>
      <AlbumDetail key={photo.title} title={photo.title} imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
    );
  }

  render() {
    console.log(this.state);


    if (!this.state.photos) { 
			return (
					<Text>
            Loading...
					</Text>
				);
    }

    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

export default AlbumList;
