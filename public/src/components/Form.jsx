import React, { Component } from "react";
import { connect } from "react-redux";
import { weatherFetched } from "../storage/actions/index.js";
import citiesList from "../utils/citiesList.json";
import regeneratorRuntime from "regenerator-runtime";
import config from "../../../config.json";

import "./Form.css";

import WeatherService from "../utils/WeatherService.js";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      cityName: "",
      fits: [],
    };

    this.WeatherService = WeatherService;

    this.formRef = React.createRef();
    this.formButtonRef = React.createRef();
    this.formInputRef = React.createRef();
    this.submitForm = this.submitForm.bind(this);
    this.SearchBoxHints = this.SearchBoxHints.bind(this);
    this.clearFits = this.clearFits.bind(this);
  }

  submitForm() {
    const string = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&appid=${config.apiKey}`;
    fetch(string).then((data) => {
      data.json().then((weather) => {
        this.props.weatherFetched(weather.list);
        const res = this.WeatherService.parseData(this.props.weather);
        this.props.bodyUpdateData();
      });
    });
  }

  checkInputValid(e) {
    const value = e.target.value;
    const test = /^[a-zA-Z-ąęółśżźć ]+$/g;
    if (value.length > 0 && value.match(test)) {
      this.setTargerValidClass(true, e);
      if (value.length > 3) {
        this.searchcountry(value);
      }else{
        this.clearFits();
      }
    } else {
      this.setTargerValidClass(false, e);
      this.clearFits();
    }
  }

  async searchcountry(searchBox) {
    let fits = await citiesList.filter((city) => {
      const regex = new RegExp(`^${searchBox}`, "gi");
      return city.name.match(regex);
    });
    this.setState({ fits: fits });

    if (searchBox.length < 3) {
      this.setState({ fits: [] });
    }
  }

  clearFits() {
    this.setState({ fits: [] });
  }

  SearchBoxHints(prop) {
    if (prop.fits.length > 0) {
      let childs = prop.fits.map((fit, i) => {
        return (
          <div key={i} className="row">
            <div className="col s12">
              <div className="card  grey darken-4 darken-1">
                <div className="card-content white-text">
                  <div
                    className="card-title m1"
                    onClick={() => {
                      this.setState({ cityName: fit.name }, () => {
                        this.formInputRef.current.value = fit.name;
                      });
                    }}
                  >
                    {fit.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
      return childs;
    } else {
      return <div>No match</div>;
    }
  }

  setTargerValidClass(isValid, e) {
    if (isValid) {
      e.target.classList.remove("is-invalid");
      e.target.classList.add("is-valid");
      this.formButtonRef.current.classList.remove("disabled");
      this.formButtonRef.current.disabled = false;
    } else {
      e.target.classList.remove("is-valid");
      e.target.classList.add("is-invalid");
      this.formButtonRef.current.classList.add("disabled");
      this.formButtonRef.current.disabled = true;
    }
  }

  render() {
    return (
      <form ref={this.formRef}>
        <div className="form-row">
          <div className="col-8">
            <input
              ref={this.formInputRef}
              type="text"
              className="form-control"
              placeholder="City"
              onChange={(e) => {
                this.checkInputValid(e);
                this.setState({ cityName: e.target.value });
              }}
            />
          </div>
          <div className="col-4">
            <button
              ref={this.formButtonRef}
              type="button"
              className="btn themeButtonColor"
              onClick={this.submitForm}
            >
              Check Weather
            </button>
          </div>
        </div>
        <this.SearchBoxHints fits={this.state.fits} />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
  };
};
const mapDispatchToProps = { weatherFetched };

export default connect(mapStateToProps, mapDispatchToProps)(Form);
