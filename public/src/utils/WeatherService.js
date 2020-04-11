import DataTracker from "./DataTracker.js";

class WeatherService {
  constructor() {
    this.forecast = [];
    this.eachDayData = {};
  }

  parseData(weatherData) {
    this.eachDayData = this.generateFiveDaysObj(weatherData);
    this.fillWithData();
    this.dumpInLog();
  }

  dumpInLog() {
    for (let key in this.eachDayData) {
      let day = this.eachDayData[key];
      for (let trackerKey in day.trackers) {
        let tracker = day.trackers[trackerKey];
        // tracker.getAllData();
      }
    }
  }

  getDataFromDay(dayNumber) {
    //day from 0-4
    if (!(dayNumber >= 0 && dayNumber < 5)) return;
    let dayKeys = Object.keys(this.eachDayData);
    return this.eachDayData[dayKeys[dayNumber]];
  }

  getDateFromDay(dayNumber) {
    //day from 0-4
    if (!(dayNumber >= 0 && dayNumber < 5)) return;
    let dayKeys = Object.keys(this.eachDayData);
    return dayKeys[dayNumber];
  }

  fillWithData() {
    for (let key in this.eachDayData) {
      let day = this.eachDayData[key];

      for (let weather of day.hours) {
        let date = new Date(weather.dt * 1000);
        let h = date.getHours() + 1;
        let m = date.getMinutes();
        let s = date.getSeconds();

        const dayReg = `${h}${m}${s}`;

        switch (dayReg) {
          //morning from 06:00 to 09:00
          case "600":
          case "900":
            day.trackers.morning.insert(weather.main.temp);
            day.trackers.morning.insert(weather.main.temp_min);
            day.trackers.morning.insert(weather.main.temp_max);
            break;

          //day from 12:00 to 18:00
          case "1200":
          case "1500":
          case "1800":
            day.trackers.day.insert(weather.main.temp);
            day.trackers.day.insert(weather.main.temp_min);
            day.trackers.day.insert(weather.main.temp_max);
            break;

          //night from 21:00 to 03:00
          case "2100":
          case "2400":
          case "300":
            day.trackers.night.insert(weather.main.temp);
            day.trackers.night.insert(weather.main.temp_min);
            day.trackers.night.insert(weather.main.temp_max);
        }

        day.trackers.humidity.insert(weather.main.humidity);
      }
    }
    //console.log(this.eachDayData);
  }

  generateFiveDaysObj(data) {
    let days = {};

    for (let day of data) {
      let thisDay = new Date(day.dt * 1000);
      let d = thisDay.getDate();
      if (d < 10) d = "0" + d;

      let m = thisDay.getMonth() + 1;
      if (m < 10) m = "0" + m;

      let y = thisDay.getFullYear();
      if (y < 10) y = "0" + y;

      if (!days.hasOwnProperty(`${d}${m}${y}`)) {
        days[`${d}${m}${y}`] = {
          trackers: {
            morning: this.createTracker(),
            night: this.createTracker(),
            day: this.createTracker(),
            humidity: this.createTracker(),
          },
          hours: [],
        };
      }

      days[`${d}${m}${y}`].hours.push(day);
    }
    return days;
  }

  createTracker() {
    return new DataTracker();
  }
}

export default new WeatherService();
