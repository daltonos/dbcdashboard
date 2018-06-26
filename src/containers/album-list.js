import React, {Component} from 'react'
import {connect} from 'react-redux'
import selectAlbum from '../actions/action_select_album'
import selectScreen from '../actions/action_select_screen'
import addChart from '../actions/action_add_chart'
import {bindActionCreators} from 'redux'
import fetchProducts from "../actions/fetching";

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
    window.requestAnimationFrame(function() {
      console.log("just finished painting");
      self.drawAllCharts();
    });
    
  }


  drawChart(chartId) {
    console.log(chartId);

    console.log(document.getElementById(chartId));
    //var oNewChartElement = document.createElement("div");
    //oNewChartElement.setAttribute('class','chart-div' + oProject.id);

    var chart = c3.generate({
      data: {
          columns: [
              ['In', 70],
              ['base', 120],
              ['Out', 100],
              ['max', 80],
              ['min', 20]
          ],
          type: 'gauge',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); },
          color: function (color, d) {
              if(d=='base') return 'grey'
              return d == 'In' ? '#a90d37' : '#ffffff';
          }
      },
      label: false,
      gauge: {
          label: {
              format: function(value, ratio , label) {
                  if(label == 'base') return;
                  return label + ' (' +value + ')';
              },
              show: true // to turn off the min/max labels.
          },
      min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
      max: 120, // 100 is default
      units: 'K-Euros',
    // for adjusting arc thickness
      },// the three color levels for the percentage values.
      size: {
          width: 400
      }
    });

    var container = document.getElementById(chartId);
    container.appendChild(chart.element);
  }

  drawAllCharts(){
    console.log("drawing All");
    var self = this;
    for (var i  = 0 ; i < this.chartIds.length; i++){
      self.drawChart(this.chartIds[i]);
    }
  }

  renderList() {
    return this.props.albums.items.map((album) => {
      this.chartIds.push('chart-div-' + album.id);
      return (
        <div key={album.id}
          className='main-div col-sm-6 card-gradient'>
          <div className='card-1 '>
            <div className='album-title'>{album.name}</div>
            <div id={'chart-div-' + album.id} ref={'chart-div-' + album.id}>hey guys</div>
          </div>
        </div>
      );
    });
  }

  render() {
    if(this.loaded){
      return (
        <div className = 'container'>
          <div id="album-items-container" className = 'album-items-container'>
            <span className="title"> Projects </span>
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
          <span>Loading Charts Library</span>
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
