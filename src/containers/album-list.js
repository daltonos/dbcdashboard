import React, {Component} from 'react'
import {connect} from 'react-redux'
import selectAlbum from '../actions/action_select_album'
import selectScreen from '../actions/action_select_screen'
import addChart from '../actions/action_add_chart'
import {bindActionCreators} from 'redux'
import fetchProducts from "../actions/fetching";
import { FormattedMessage } from 'react-intl';

class AlbumList extends Component {
  chartIds = [];
  loaded = false;

  componentDidMount() {
    console.log("component did mount");
    this.props.fetchProducts();
    this.loaded = true;
  }
  componentDidUpdate() {
    console.log("component did update");
    var self = this;
    self.drawAllCharts();
    
  }


  drawChart(oProject) {
    console.log(oProject.id);

    var chart = c3.generate({
        data: {
            columns: [
                ['Amount already in', 0]
            ],
            type: 'bar'
        },
        bar: {
            width: 32
        },
        size: {
            height: 200
        },
        axis: {
            rotated: true
        },
        grid: {
            y: {
                lines: [{value: oProject['minimum-funding-goal'], class: 'threshold-line', text: 'Min'}, {value: oProject['total-funding-goal'], class: 'threshold-line', text: 'Max'}, {value: oProject['total-amount-outstanding'], class: 'threshold-line', text: 'Out'}]
            }
        }
    });


    setTimeout(function () {
        chart.load({
            columns: [
                ['Amount already in', oProject['total-amount-already-in']]
            ]
        });
    }, 1000);


    var container = document.getElementById('chart-div-' + oProject.id);
    container.appendChild(chart.element);
  }

  drawAllCharts(){
    console.log("drawing All");
    var self = this;
    this.props.albums.items.map((project) => {
      self.drawChart(project);
    });
  }

  renderList() {
    return this.props.albums.items.map((album) => {
      return (
        <div key={album.id}
          className='main-div col-sm-6 card-gradient'>
          <div className='card-1 '>
            <div>
              <div className='att-line'>
                <span className='pull-left project-title'>{album.name}</span>
                <span className='pull-right'><FormattedMessage id="project_owner_init"/>: {album['owner']}</span>
              </div><br/>
              <span className='att-line'>
                <span className='pull-left'><FormattedMessage id="city"/>: {album['city']}</span>
                <span className='pull-right'><FormattedMessage id="street"/>: {album['street']}</span>
              </span>
              <span className='att-line'>
                <span className='pull-left'><FormattedMessage id="bank"/>: {album['bank']}</span>
                <span className='pull-right'><FormattedMessage id="due_date"/>: {album['due-date']}</span>
              </span>
            </div>
            <div id={'chart-div-' + album.id} ref={'chart-div-' + album.id} className='chart-div'></div>
          </div>
        </div>
      );
    });
  }

  render() {
    if(this.loaded){
      return (
        <div className = 'container'>
          <div className = 'projects-title-area'>
            <span className="title"> Projects </span>
            <img src="/img/dbc-logo.svg" className='dbc-logo'/>
          </div>
          <div id="album-home">
            <div>
              {this.renderList()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className = 'container'>
          <span className="title"> Loading Projects Charts </span>
          <img src="/img/dbc-logo.svg" className='dbc-logo'/>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    albums: state.albums,
    loaded: false,
    screen: state.activeScreen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectScreen: selectScreen, addChart: addChart, selectAlbum: selectAlbum, fetchProducts: fetchProducts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList)
