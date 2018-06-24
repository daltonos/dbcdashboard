function selectScreen(screen) {
  return {
    type: 'CHANGE_SCREEN',
    payload: screen
  }
}
export default selectScreen;
