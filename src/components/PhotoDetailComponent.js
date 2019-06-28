import React from 'react';
import { ScrollView, Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import axios from 'axios';
import Comment from './Comment'

export default class PhotoDetailComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showComments: false, comments: null };
    this.title = props.title;
    this.imageUrl = props.imageUrl;
    this.photo_id = props.photo_id;
  }

  componentWillMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${this.photo_id}&format=json&nojsoncallback=1`)
      .then(response => this.loadComments(response))
      .catch(error => console.log(error));        
  }

  loadComments(response) {
    this.setState(prevState => (
      {
        showComments: prevState.showComments,
        comments: response.data.comments.comment
      })
    );
  }

  showHideComments() {
    this.setState(prevState => (
      {
        showComments: !prevState.showComments,
        comments: prevState.comments
      }
    ));
  }

  createComments() {
    return this.state.comments
      .map(comment =>
       <Comment key={comment.id} username={comment.authorname} comment={comment._content}/>
      );
  }

  renderComments() {
    if (this.state.showComments) {
      if (this.state.comments) {
        return (
          <View style={{ flex: 1 }}>
            <ScrollView>
              {this.createComments()}
            </ScrollView>
          </View>
        )
      } else {
        return (
          <CardSection >
            <Text>"Loading comments..."</Text>
          </CardSection>
        );
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <View style={styles.thumbnailContainerStyle}>
            <Image
              style={styles.thumbnailStyle}
              source={{ uri: this.imageUrl }}
            />
          </View>
          <View style={styles.headerContentStyle}>
            <Text style={styles.headerTextStyle}>{this.title}</Text>

          </View>
        </CardSection>

        <CardSection>
          <Image
            style={styles.imageStyle}
            source={{ uri: this.imageUrl }}
          />
        </CardSection>

        <CardSection>
          <Button onPress={() => Linking.openURL(this.imageUrl)}>
            See Now!
          </Button>
          <Button onPress={() => this.showHideComments()}>
            Comments!
          </Button>
        </CardSection>

        {this.renderComments()}
      </Card>
    );
  }
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};


