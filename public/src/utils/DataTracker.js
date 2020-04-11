class DataTracker {
  constructor() {
    this.data = [];
  }

  insert(value) {
    this.data.push(value);
  }

  getAllData() {
    console.log(`
      Arr: ${this.data}
      min: ${this.showMin()}
      max: ${this.showMax()}
      mid: ${this.showMean()}
    `);
    return this.data;
  }

  showMin() {
    if (this.data.length > 0) {
      return Math.min(...this.data);
    } else return null;
  }

  showMax() {
    if (this.data.length > 0) {
      return Math.max(...this.data);
    } else return null;
  }

  showMean() {
    if (this.data.length > 0) {
      let sum = 0;
      for (let el of this.data) {
        sum += el;
      }
      return sum / this.data.length;
    } else return null;
  }

  showMode() {
    //what is mode?!?
  }
}

export default DataTracker;
