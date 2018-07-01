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

  getLabel(text, value) {
    return text + " (" + value + ")";
  }

  stickLabels(e) {
    console.log("fixing sticks", e);
    //var chartWidth = d3.selectAll(".c3-event-rect")[0].getBoundingClientRect().width;
    //var minTextWidth = d3.selectAll(".min-line text")[0].getBoundingClientRect().width;
    //var maxTextWidth = d3.selectAll(".max-line text")[0].getBoundingClientRect().width;
    var outTextWidth, minTextWidth, maxTextWidth;
    d3.selectAll(".out-line text")._groups[0].forEach(htmlObj => outTextWidth = htmlObj.getBoundingClientRect().width);
    d3.selectAll(".min-line text")._groups[0].forEach(htmlObj => minTextWidth = htmlObj.getBoundingClientRect().width);
    d3.selectAll(".max-line text")._groups[0].forEach(htmlObj => maxTextWidth = htmlObj.getBoundingClientRect().width);


    /* outTextWidth =0;
    minTextWidth =0;
    maxTextWidth =0; */
    //console.log(Math.floor(outTextWidth));
    
    d3.selectAll(".out-line text")
        .attr("x", function(d) {
            var width =  /* outTextWidth > 0 ? Math.floor(d3.select(this).attr("y")) + Math.floor(outTextWidth) + 16 : */ Math.floor(d3.select(this).attr("y"));
            return width;
        });
    d3.selectAll(".min-line text")
        .attr("x", function(d) {
            var width =  /* minTextWidth > 0 ? Math.floor(d3.select(this).attr("y")) + Math.floor(minTextWidth) + 16  : */ Math.floor(d3.select(this).attr("y"));
            return width;
        });
    d3.selectAll(".max-line text")
        .attr("x", function(d) {
            var width =  /* maxTextWidth > 0 ? Math.floor(d3.select(this).attr("y")) + Math.floor(maxTextWidth) + 16 : */ Math.floor(d3.select(this).attr("y"));
            return width;
        });

    d3.selectAll(".out-line line")
        .attr("y1", 28).attr("y2", 78.5);
    d3.selectAll(".min-line line")
        .attr("y1", 42).attr("y2", 78.5);
    d3.selectAll(".max-line line")
        .attr("y1", 14).attr("y2", 78.5);
    
    d3.selectAll(".threshold-line text")
        .attr("dy", function(d) {
          var textSel = d3.select(this);
          return -textSel.attr("y") + 20;
        }).attr("transform", 'rotate(0)');

    d3.select(".chart-div .c3-ygrid-lines")
        .append("circle")
        .attr("cx",190)
        .attr("cy", 82.5)
        .attr("r", 10)
        .attr("fill",'white')
        .attr("stroke",'grey')
        .attr("stroke-width",2);

    d3.select(".chart-div .c3-ygrid-lines")
        .append("text").text('220').attr("transform-origin","center")
        .attr("x",190)
        .attr("y", 120.5)
        .attr("fill", 'black').attr("height",'30');
  }

  onRenderedChart () {
    console.log("onrendered");
    //this.stickLabels(1,2);
  }

  onResizedChart () {
    console.log("onresized");
    //this.stickLabels();
  }


  drawChart(oProject) {

    var trueMaxLabel = 'maximum_funding_goal';
    var trueMax = oProject['total-funding-goal'];
    var secondMaxLabel = 'amount_sent_out';
    var secondMax = oProject['total-amount-outstanding'];
    if(Number(trueMax) < Number(secondMax)){
      var tm = trueMax;
      var tmLabel = trueMaxLabel;

      trueMax = secondMax;
      trueMaxLabel = secondMaxLabel;

      secondMax = tm;
      secondMaxLabel = tmLabel;
    }

    var chart = c3.generate({
        data: {
            columns: [
                ['in', 0],
                ['missing', oProject['total-funding-goal']*2]
            ],
            type: 'bar',
            colors: {
              'in': function(d) {
                return d.value < 500 ? '#C00' : '#0C0'
              },
              'missing': 'grey'
            },
            groups: [
              ['in', 'missing']
            ],
            order: false
        },
        bar: {
            width: 8
        },
        size: {
            height: 200
        },
        axis: {
            rotated: true,
            y: {
              show: false,
              max: oProject['total-funding-goal']*2,
              min: 0,
              padding: {top: 0, bottom: 0}
            },
            x: {
              show: false,
              padding: {left: 0, right: 0}
            }
        },
        grid: {
          y: {
              lines: [{value: oProject['minimum-funding-goal'], class: 'threshold-line min-line', text: this.getLabel('Min', oProject['minimum-funding-goal'])},
              {value: oProject['total-funding-goal'], class: 'threshold-line max-line', text: this.getLabel('Max', oProject['total-funding-goal'])},
              {value: oProject['total-amount-outstanding'], class: 'threshold-line out-line', text: this.getLabel('Out', oProject['total-amount-outstanding'])}]
          }
        },
        tooltip: {
          show: false
        },
        onresized: this.stickLabels,
        onrendered: this.stickLabels
    });

    setTimeout(function () {
      chart.load({
          columns: [
              ['in', oProject['total-amount-already-in']],
              ['missing', oProject['total-funding-goal']*2 - oProject['total-amount-already-in']]
            ],
            duration: 1500
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
