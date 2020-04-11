import React from "react";
import "./styles/Body.css";
import Form from "../components/Form.jsx";
import Card from "../components/Card.jsx";

import WeatherService from "../utils/WeatherService.js";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}],
    };

    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    this.setState({
      data: [
        {
          date: WeatherService.getDateFromDay(0),
          data: WeatherService.getDataFromDay(0),
        },
        {
          date: WeatherService.getDateFromDay(1),
          data: WeatherService.getDataFromDay(1),
        },
        {
          date: WeatherService.getDateFromDay(2),
          data: WeatherService.getDataFromDay(2),
        },
        {
          date: WeatherService.getDateFromDay(3),
          data: WeatherService.getDataFromDay(3),
        },
        {
          date: WeatherService.getDateFromDay(4),
          data: WeatherService.getDataFromDay(4),
        },
      ],
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="row pt-2">
            <div className="col">
              <Form bodyUpdateData={this.updateData} />
            </div>
          </div>

          <div className="row pt-2 mt-5">
            <div className="col-sm-6">
              <Card header={this.state} data={this.state.data[0]} />
            </div>
            <div className="col-sm-6">
              <Card data={this.state.data[1]} />
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-sm-6">
              <Card data={this.state.data[2]} />
            </div>
            <div className="col-sm-6">
              <Card data={this.state.data[3]} />
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-sm-6">
              <Card data={this.state.data[4]} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Body;
