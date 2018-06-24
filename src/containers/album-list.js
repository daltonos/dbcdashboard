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
    this.props.fetchProducts();
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    self = this;
    google.charts.setOnLoadCallback(function(){
      self.loaded = true;
      self.render();
    });
    console.log("MOUNTING");
  }


  shouldComponentUpdate() {
    console.log("component should update")
    //this.drawAllCharts();
    return true;
  }


  drawChart(iChartId) {
    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.

    // Create the data table.
    var data = new google.visualization.DataTable();
    console.log("a");
    data.addColumn('string', 'Topping');
    console.log("b");
    data.addColumn('number', 'Slices');
    console.log("c");
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);
    console.log("d");
    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                   'width':400,
                   'height':300};
                   console.log("e");
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(iChartId));
    console.log("f");
    chart.draw(data, options);
    console.log("g");
  }

  drawAllCharts(){
    console.log("drawing", this.chartIds);
    var self = this;
    for (var i  = 0 ; i < this.chartIds.length; i++){
      console.log("hey");
    }
  }

  renderList() {
    return this.props.albums.items.map((album) => {
      this.chartIds.push('chart_div_' + album.id);
      this.drawChart('chart_div_' + album.id);
      return (
        <div key={album.id} onClick={this.drawChart('chart_div_' + album.id)}
          className='main-div col-sm-6 card-gradient'>
          <div className='card-1 '>
            <div className='album-title'>{album.name}</div>
            <div id={'chart_div_' + album.id} refs={'chart_div_' + album.id}></div>
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
