import React, {Component} from "react";
import WeatherService from "./WeatherService";


const weatherService = new WeatherService();

class  WeatherGraph  extends  Component {

  constructor(props) {
    super(props);
    this.state  = {
        points: [],
    };
}

  componentDidMount() {
    var self = this;
    weatherService.getWeatherGraph().then(function (result) {
      self.setState({points: result.data})
    });
  }

  render() {

    return (
      <div className="weather--list">

        <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>Humidity</th>
            <th>Pressure</th>
            <th>Temperature</th>
            <th>Time</th>
          </tr>
          </thead>
          <tbody>
          {this.state.points.map(c =>
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.humidity}</td>
              <td>{c.pressure}</td>
              <td>{c.temperature}</td>
              <td>{c.time}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}
export  default  WeatherGraph


