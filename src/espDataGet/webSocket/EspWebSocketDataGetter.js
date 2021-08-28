export class EspWebSocketDataGetter {

  constructor(store, webSocketPath_) {
    this.store = store;
    this.webSocketPath = webSocketPath_;
    this.webSocket = null;
    this.recentMessageTime = 0;
    this.checkConnectionInterval = null;
  }

  initializeWebSocket() {
    let self = this;
    this.webSocket = new WebSocket(this.webSocketPath);
    this.webSocket.onopen = function() {
      console.log("Initialized WebSocket connection: " + self.webSocketPath);
      self.recentMessageTime = new Date().getTime();
      self.setCheckConnectionInterval();
    };
    this.webSocket.onmessage = function (event) {
      self.recentMessageTime = new Date().getTime();
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
    this.webSocket.onerror = function(event) {
      console.error("WebSocket error observed:", event);
    };
  }

  closeWebSocket() {
    if (this.webSocket == null || this.webSocket.readyState !== WebSocket.OPEN) {
      return;
    }
    
    this.webSocket.close();
    this.webSocket = null;
    this.clearCheckConnectionInterval();
    console.log("Closed WebSocket connection");
  }

  updateWebSocketPath(newWebSocketPath) {
    if (this.webSocket != null) {
      this.closeWebSocket();
    }

    this.webSocketPath = newWebSocketPath;
    this.initializeWebSocket();
  }

  setCheckConnectionInterval() {
    let self = this;
    this.checkConnectionInterval = setInterval(
      function() {
        if (new Date().getTime() - self.recentMessageTime > 5000) {
          console.log("Exceeded time waiting for next WebSocket message");
          self.closeWebSocket();
          self.store.commit('espConnect/setConnected', false);
        }
      },
      1000
    )
  }

  clearCheckConnectionInterval() {
    clearInterval(this.checkConnectionInterval);
  }
}