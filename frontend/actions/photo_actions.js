import {
  getPhotos,
  getUserPhotos,
  getTagPhotos,
  getPhoto,
  postPhoto,
  patchPhoto,
  deletePhoto,
  postAlbumMembership,
  postAddTag,
  postRemoveTag
} from '../util/photo_api_util';
import { startLoading } from './loading_actions';

export const RECEIVE_PHOTOS = "RECEIVE_PHOTOS";
export const RECEIVE_PHOTO = "RECEIVE_PHOTO";
export const REMOVE_PHOTO = "REMOVE_PHOTO";

export const receivePhotos = photos => ({
  type: RECEIVE_PHOTOS,
  photos
});

export const receivePhoto = payload => ({
  type: RECEIVE_PHOTO,
  payload
});

export const removePhoto = photo => ({
  type: REMOVE_PHOTO,
  photo
});

export const requestAllPhotos = () => dispatch => {
  dispatch(startLoading());
  return getPhotos().then(photos => dispatch(receivePhotos(photos)));
};

export const requestUserPhotos = userId => dispatch => {
  dispatch(startLoading());
  return getUserPhotos(userId).then(photos => dispatch(receivePhotos(photos)));
};

export const requestTagPhotos = tagName => dispatch => {
  dispatch(startLoading());
  return getTagPhotos(tagName).then(photos => dispatch(receivePhotos(photos)));
};

export const requestPhoto = photoId => dispatch => {
  dispatch(startLoading());
  return getPhoto(photoId).then(photo => dispatch(receivePhoto(photo)));
};

export const createPhoto = photo => dispatch => (
  postPhoto(photo).then(photo => dispatch(receivePhoto(photo)))
);

export const editPhoto = photo => dispatch => (
  patchPhoto(photo).then(photo => dispatch(receivePhoto(photo)))
);

export const destroyPhoto = photoId => dispatch => (
  deletePhoto(photoId).then(photo => dispatch(removePhoto(photo)))
);

export const editAlbumMembership = (photoId, albums) => dispatch => (
  postAlbumMembership(photoId, albums).then(photo => dispatch(receivePhoto(photo)))
);

export const addTag = (photoId, tag) => dispatch => (
  postAddTag(photoId, tag).then(photo => dispatch(receivePhoto(photo)))
);

export const removeTag = (photoId, tag) => dispatch => (
  postRemoveTag(photoId, tag).then(photo => dispatch(receivePhoto(photo)))
);
