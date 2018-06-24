import React, { Component } from 'react';
import {connect} from 'react-redux'
import selectScreen from '../actions/action_select_screen'
import {bindActionCreators} from 'redux'

var currItem;

class AlbumDetail extends Component {

	renderItems() {
		return this.props.album.map((album) => {
			return (
				<div
					onClick={() => {currItem = album; this.props.selectScreen('PHOTO-SCREEN'); }}
          className='main-div col-sm-4 card-gradient'>
          <div className='card-1 '>
            <img className='album-img' src={album.thumbnailUrl}/>
            <div className='album-title'>{album.title}</div>
          </div>
        </div>
			);
		});
	}

	render() {
		if(this.props.screen == 'ITEM-DETAILS' && this.props.album){
			return (
				<div id="album-items-container" className = 'album-items-container'>
					<div className="title">
						<a onClick={() => {this.props.selectScreen('HOME-PAGE')}}>Go Back</a>
						<span className="album-items-text"> to All Albums </span>
					</div>
					<div className="detail-image-div">
						<img src={this.props.album[0].url}/>
					</div>
					<div className="container album-items">{this.renderItems()}</div>
				</div>
			);
		} else if(this.props.screen == 'PHOTO-SCREEN'){
			return (
				<div id="album-items-container" className = 'album-items-container'>
					
					<div className="title">
						<a onClick={() => {this.props.selectScreen('HOME-PAGE')}}>Go Back</a>
						<span className="album-items-text"> to All Albums </span>
					</div>
					<div className="detail-image-div">
						<img src={this.props.album[0].url}/>
					</div>
					<div className="container album-items">{this.renderItems()}</div>
					<div className="photoScreen">
						<a class="close-button" onClick={() => {this.props.selectScreen('ITEM-DETAILS');}}>Close</a>
						<br/>
						<span><img src={currItem.url}/></span>
					</div>
				</div>
			);
		} else {
			return (
				<div id="album-items-container" className = 'album-items-container'>
					<span className="album-items-text title"> Click on one of the items to see the Album's details </span>
				</div>
			);
		}
		
	}
}


function mapStateToProps(state) {
  return {
    album: state.activeAlbum,
    screen: state.activeScreen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectScreen: selectScreen}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail)
