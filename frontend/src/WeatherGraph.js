import React, {Component} from "react";
import WeatherService from "./WeatherService";
import ReactEcharts from 'echarts-for-react';
import DatePicker from 'react-date-picker';

const weatherService = new WeatherService();

class  WeatherGraph  extends  Component {

  constructor(props) {
    super(props);
    this.state  = {};
    this.start  = new Date(new Date().setDate(new Date().getDate()-7));
    this.end  = new Date();
    this.today  = new Date();
    this.graph_type = ''
}

  componentDidMount() {
    let self = this;
    weatherService.getWeatherGraph().then(function (result) {
      self.graph_type = result.name.toLowerCase();
      self.setState({
        baseOption: {
          title: {
            left: 'center',
            text: result.name
          },
          xAxis: {
            type: 'category',
            data: result.x
          },
          yAxis: {
            type: 'value',
            name: `${result.name}, ${result.dimension}`
          },
          series: [{
            data: result.y,
            type: 'line',
            smooth: true
          }]
        }
      })
    });
  }

  handleChangeGraphType(e, graph_type) {
    let self = this;
    weatherService.getWeatherGraph(graph_type, self.start, self.end).then(function (result) {
      self.graph_type = result.name.toLowerCase();
      self.setState({
        baseOption: {
          title: {
            left: 'center',
            text: result.name
          },
          xAxis: {
            type: 'category',
            data: result.x
          },
          yAxis: {
            type: 'value',
            name: `${result.name}, ${result.dimension}`
          },
          series: [{
            data: result.y,
            type: 'line',
            smooth: true
          }]
        }
      })
    });
  }

  handleChangeGraphStart = date => {
    let self = this;
    self.start = date;
    weatherService.getWeatherGraph(self.graph_type, self.start).then(function (result) {
      self.setState({
        baseOption: {
          title: {
            left: 'center',
            text: result.name
          },
          xAxis: {
            type: 'category',
            data: result.x
          },
          yAxis: {
            type: 'value',
            name: `${result.name}, ${result.dimension}`
          },
          series: [{
            data: result.y,
            type: 'line',
            smooth: true
          }]
        }
      })
    });
  };

  handleChangeGraphEnd = date => {
    let self = this;
    self.end = date;
    weatherService.getWeatherGraph(self.graph_type, self.start, self.end).then(function (result) {
      self.setState({
        baseOption: {
          title: {
            left: 'center',
            text: result.name
          },
          xAxis: {
            type: 'category',
            data: result.x
          },
          yAxis: {
            type: 'value',
            name: `${result.name}, ${result.dimension}`
          },
          series: [{
            data: result.y,
            type: 'line',
            smooth: true
          }]
        }
      })
    });
  };
  render() {

    return (
      <div>
        <ReactEcharts option={this.state}/>
        <div className="form-group row">
          <label className="col-form-label col-3" htmlFor="graph_type_select">Choose graph type:</label>
          <div className='col-9'>
            <select onChange={(e)=> this.handleChangeGraphType(e, e.target.value)} className="form-control" id="graph_type_select">
              <option value="humidity">Humidity</option>
              <option value="pressure">Pressure</option>
              <option value="temperature" defaultValue>Temperature</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-form-label col-3" htmlFor="graph_start">Choose start date:</label>
          <div className="col-3">
            <DatePicker
              id='graph_start'
              onChange={this.handleChangeGraphStart}
              value={this.start}
              maxDate={this.end}
            />
          </div>
        <label className="col-form-label col-3" htmlFor="graph_end">Choose end date:</label>
        <div className="col-3">
          <DatePicker
            id='graph_end'
            onChange={this.handleChangeGraphEnd}
            value={this.end}
            maxDate={this.today}
            minDate={this.start}
          />
        </div>
      </div>
      </div>
    );
  }
}
export  default  WeatherGraph


