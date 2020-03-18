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
    this.graph_type = '';
    this.show_past = false;
}

  fix_datepicker_bug (date) {
    if (date) {
      return new Date(new Date().setDate(date.getDate()));
    } else {
      return date
    }
  }

  original (result) {
    let self = this;
    let dict = {
      baseOption: {
        tooltip: {
          trigger: 'axis'
        },
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
    };
    if (self.show_past) {
      dict.baseOption.series.push({
        data: result.past_weather,
        type: 'scatter',
        symbolSize: 12
      })
    }
    return dict
  }


  componentDidMount() {
    let self = this;
    weatherService.getWeatherGraph().then(function (result) {
      self.graph_type = result.name.toLowerCase();
      self.setState(self.original(result))
    });
  }

  handleChangeGraphType(e, graph_type) {
    let self = this;
    weatherService.getWeatherGraph(graph_type, this.fix_datepicker_bug(self.start), this.fix_datepicker_bug(self.end)).then(function (result) {
      self.graph_type = result.name.toLowerCase();
      self.setState(self.original(result))
    });
  }

  handleChangeGraphStart = date => {
    let self = this;
    self.start = date;
    weatherService.getWeatherGraph(self.graph_type, this.fix_datepicker_bug(self.start), this.fix_datepicker_bug(self.end)).then(function (result) {
      self.setState(self.original(result))
    });
  };

  handleChangeGraphEnd = date => {
    let self = this;
    self.end = date;
    weatherService.getWeatherGraph(self.graph_type, this.fix_datepicker_bug(self.start), this.fix_datepicker_bug(self.end)).then(function (result) {
      self.setState(self.original(result))
    });
  };

  handleChangeGraphShowPast = event => {
    let self = this;
    self.show_past = event.target.checked;
    weatherService.getWeatherGraph(self.graph_type, this.fix_datepicker_bug(self.start), this.fix_datepicker_bug(self.end), self.show_past).then(function (result) {
      self.setState(self.original(result))
    });
  };

  render() {

    return (
      <div>
        <ReactEcharts option={this.state} notMerge={true}/>
        <div className="form-group row">
          <label className="col-form-label col-3" htmlFor="graph_type_select">Choose graph type:</label>
          <div className='col-3'>
            <select defaultValue={this.name} onChange={(e)=> this.handleChangeGraphType(e, e.target.value)} className="form-control" id="graph_type_select">
              <option value="humidity">Humidity</option>
              <option value="pressure">Pressure</option>
              <option value="temperature">Temperature</option>
            </select>
          </div>
          <label className="col-form-label col-md-3" htmlFor="show_past">Show last year:</label>
          <div className="checkbox col-md-1">
            <input type="checkbox"
                   id="show_past"
                   name="show_past"
                   onChange={this.handleChangeGraphShowPast}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-form-label col-3" htmlFor="graph_start">Choose start date:</label>
          <div className="col-3">
            <DatePicker
              id='graph_start'
              clearIcon={false}
              onChange={this.handleChangeGraphStart}
              value={this.start}
              maxDate={this.end}
            />
          </div>
        <label className="col-form-label col-3" htmlFor="graph_end">Choose end date:</label>
        <div className="col-3">
          <DatePicker
            id='graph_end'
            clearIcon={false}
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


