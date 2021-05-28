export class EspWebSocketDataGetter {

  constructor(store, webSocketPath_) {
    this.store = store;
    this.webSocketPath = webSocketPath_;
    this.webSocket = null;
  }

  initializeWebSocket() {
    let self = this;
    this.webSocket = new WebSocket(this.webSocketPath);
    this.webSocket.onopen = function() {
      console.log("Initialized WebSocket connection: " + self.webSocketPath);
    };
    this.webSocket.onmessage = function (event) {
      if (event.data != null) {
        let json = JSON.parse(event.data);
        if (json == null) {
          console.log("[ERROR] WebSocket: JSON is null!");
          return;
        }
        if (json.Fm != null && json.Fm.FmChannelValues.length > 0) {
          self.store.commit('fm/setEspFmChannelValuesJson', json.Fm);
          self.store.commit('fm/addFmChannelValues', json.Fm);
        }
        if (json.Gyro != null && json.Gyro.GyroValues.length > 0) {
          self.store.commit('gyro/setEspGyroValuesJson', json.Gyro);
          self.store.commit('gyro/addGyroValues', json.Gyro);
        }
        if (json.Motor != null && json.Motor.Motors.length > 0) {
          self.store.commit('motor/setEspMotorsJson', json.Motor);
          self.store.commit('motor/addMotorsChartData', json.Motor);
        }
      }
    };
  }

  closeWebSocket() {
    this.webSocket.close();
    this.webSocket = null;
  }

  updateWebSocketPath(newWebSocketPath) {
    if (this.webSocket != null) {
      this.closeWebSocket();
    }

    this.webSocketPath = newWebSocketPath;
    this.initializeWebSocket();
  }
}