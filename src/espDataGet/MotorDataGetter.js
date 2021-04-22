import fetchMethods from "@/common/fetchMethods"

export class MotorDataGetter {

  constructor(store, requestPath_) {
    this.store = store;
    this.fetchInterval = null;
    this.requestPath = requestPath_;
  }

  startFetching() {
    let self = this;

    if (this.fetchInterval != null) {
      clearInterval(this.fetchInterval);
    }

    this.fetchInterval = fetchMethods.setFetchDataInterval(
      this.requestPath + "motor",
      function (motorJson) {
        if (motorJson != null && motorJson.Motors && motorJson.Motors.length > 0) {
          self.store.commit('motor/setEspMotorsJson', motorJson);
          self.store.commit('motor/addMotorsChartData', motorJson);
        }
      },
      self.store,
      50
    );
  }

  stopFetching() {
    clearInterval(this.fetchInterval);
  }

  updateRequestPath(newRequestPath) {
    this.requestPath = newRequestPath;
    this.startFetching();
  }
}