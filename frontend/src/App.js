import  React, { Component } from  'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import  WeatherGraph  from  './WeatherGraph'
import  './App.css';


const BaseLayout = () => (
  <div className="container-fluid">

    <div className="content">
      <Route path="/" exact component={WeatherGraph} />
    </div>

  </div>
);

class  App  extends  Component {

  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>

    );
  }
}
export  default  App;