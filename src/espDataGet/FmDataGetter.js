import fetchMethods from "@/common/fetchMethods"

export class FmDataGetter {

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
      this.requestPath + "fm",
      function (fmJson) {
        if (fmJson != null) {
          self.store.commit('fm/setEspFmChannelValuesJson', fmJson);
          self.store.commit('fm/addFmChannelValues', fmJson);
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