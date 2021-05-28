import fetchMethods from "@/common/fetchMethods"

export class GyroDataGetter {

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
      this.requestPath + "gyro",
      function (gyroJson) {
        if (gyroJson != null && gyroJson.GyroValues && gyroJson.GyroValues.length > 0) {
          self.store.commit('gyro/setEspGyroValuesJson', gyroJson);
          self.store.commit('gyro/addGyroValues', gyroJson);
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