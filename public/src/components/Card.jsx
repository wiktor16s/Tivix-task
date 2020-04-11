import React, { Component } from "react";

import "./Card.css";
const kelvin = 273.15;

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };

    this.parseStringToData = this.parseStringToData.bind(this);
    this.RenderHeader = this.RenderHeader.bind(this);
    this.RenderBody = this.RenderBody.bind(this);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  RenderBody(props) {
    if (
      !props.data.hasOwnProperty("data") ||
      !props.data.data.hasOwnProperty("trackers")
    ) {
      return (
        <div className="col CardBody text-center align-center">no data</div>
      );
    } else {
      const trackers = props.data.data.trackers;
      return (
        <div className="col CardBody">
          <div className="row row-dark">
            <div className="col text-center">
              <b>Humidity:</b>
            </div>
          </div>

          <div className="row row-dark">
            <div className="col-4">Min: {trackers.humidity.showMin()}%</div>
            <div className="col-4">Avg: {trackers.humidity.showMean()}% </div>
            <div className="col-4">Max: {trackers.humidity.showMax()}%</div>
          </div>

          <div className="row">
            <div className="col text-center">
              <b>Morning:</b>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              Min: {(trackers.morning.showMin() - kelvin).toFixed(2)} &#x2103;
            </div>
            <div className="col-4">
              Avg: {(trackers.morning.showMax() - kelvin).toFixed(2)} &#x2103;
            </div>
            <div className="col-4">
              Max: {(trackers.morning.showMean() - kelvin).toFixed(2)} &#x2103;
            </div>
          </div>

          <div className="row row-dark">
            <div className="col text-center">
              <b>Day:</b>
            </div>
          </div>
          <div className="row row-dark">
            <div className="col-4">
              Min: {(trackers.day.showMin() - kelvin).toFixed(2)} &#x2103;
            </div>
            <div className="col-4">
              Avg: {(trackers.day.showMax() - kelvin).toFixed(2)} &#x2103;
            </div>
            <div className="col-4">
              Max: {(trackers.day.showMean() - kelvin).toFixed(2)} &#x2103;
            </div>
          </div>

          <div className="row">
            <div className="col text-center">
              <b>Night:</b>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              Min: {(trackers.night.showMin() - kelvin).toFixed(2)} &#x2103;
            </div>
            <div className="col-4">
              Avg: {(trackers.night.showMax() - kelvin).toFixed(2)} &#x2103;
            </div>
            <div className="col-4">
              Max: {(trackers.night.showMean() - kelvin).toFixed(2)} &#x2103;
            </div>
          </div>
        </div>
      );
    }
  }

  RenderHeader(props) {
    if (!props.data.hasOwnProperty("date")) {
      return <div className="col CardHeader">---</div>;
    } else {
      console.log(props);
      return (
        <div className="col CardHeader">
          {this.parseStringToData(props.data.date)}
        </div>
      );
    }
  }

  parseStringToData(string) {
    let ret = [];
    let i;
    let len;

    for (i = 0, len = string.length; i < len; i += 2) {
      if (i < string.length - 4) {
        ret.push(string.substr(i, 2));
      } else {
        ret.push(string.substr(i, string.length));
        i = string.length;
      }
    }

    return ret.join(".");
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container-fluid">
          <div className="row row-header">
            <this.RenderHeader data={this.state.data} />
          </div>
          <div className="row row-body">
            <this.RenderBody data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
