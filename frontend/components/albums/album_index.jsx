import React from 'react';
import AlbumIndexItem from './album_index_item';
import LoadingSpinner from '../loading_spinner';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';

class AlbumIndex extends React.Component {
  componentWillMount() {
    this.props.requestUserAlbums(this.props.match.params.userId);
    this.props.requestUser(this.props.match.params.userId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.userId !== newProps.match.params.userId) {
      this.props.requestUserAlbums(newProps.match.params.userId);
      this.props.requestUser(newProps.match.params.userId);
    }
  }

  render() {
    console.log(this.props);
    const { albums, loading, user } = this.props;

    if (loading) {
      return (
        <LoadingSpinner />
      );
    }

    if (!user) { return <div></div>; }

    let albumIndex = <h2>Nothing to see here.</h2>;
    if (albums.length > 0) {
      albumIndex = albums.map(album =>
        <AlbumIndexItem key={album.id} album={album}/>
      );
    }

    return (
      <div className="user-albums-container">
        <div className="album-index-bar">
          <div className="album-owner">
            <Image publicId={user.img_url} cloudName="shuttr" >
              <Transformation width="100" height="100" crop="thumb" />
            </Image>
            <h2>{ user.username }</h2>
          </div>

          <Link to="/albums/new">New Album</Link>
        </div>
        <div className="albums-index">
          { albumIndex }
        </div>
      </div>
    );
  }
}

export default AlbumIndex;
