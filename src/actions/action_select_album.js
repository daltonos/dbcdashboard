function selectAlbum(album) {
  return {
    type: 'ALBUM_SELECTED',
    payload: album
  }
}
export default selectAlbum;
