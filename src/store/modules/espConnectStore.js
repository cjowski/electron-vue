import commonEnums from "@/common/enums"

export default {
  namespaced: true,
  
  state: {
    espAccessPointIP: "",
    espWifiIP: "",
    espPort: "",
    espWifiSSID: "",
    espWifiPassword: "",
    possibleWifiCredentials: [],
    selectedEspMode: 0,
    connected: false,
    connectInProgress: false,
    timeoutCount: 0
  },

  getters: {
    espAccessPointIP: state => {
      return state.espAccessPointIP;
    },
    espWifiIP: state => {
      return state.espWifiIP;
    },
    espIP: state => {
      switch (state.selectedEspMode) {
        case commonEnums.espMode.accessPoint: return state.espAccessPointIP;
        case commonEnums.espMode.wifi: return state.espWifiIP;
        default: throw Error("Invalid ESP mode: " + state.selectedEspMode);
      }
    },
    espPort: state => {
      return state.espPort;
    },
    espWifiSSID: state => {
      return state.espWifiSSID;
    },
    espWifiPassword: state => {
      return state.espWifiPassword;
    },
    possibleWifiCredentials: state => {
      return state.possibleWifiCredentials;
    },
    espRequestPath: (state, getters) => {
      return "http://" + getters.espIP + ":" + state.espPort + "/";
    },
    espWebSocketPath: (state, getters) => {
      return "ws://" + getters.espIP + "/esp32ws";
    },
    selectedEspMode: state => {
      return state.selectedEspMode;
    },
    connected: state => {
      return state.connected;
    },
    accessPointConnected: state => {
      return state.connected && state.selectedEspMode == commonEnums.espMode.accessPoint;
    },
    wifiConnected: state => {
      return state.connected && state.selectedEspMode == commonEnums.espMode.wifi;
    },
    connectInProgress: state => {
      return state.connectInProgress;
    }
  },

  mutations: {
    setEspAccessPointIP(state, newEspAccessPointIP) {
      state.espAccessPointIP = newEspAccessPointIP;
    },
    setEspWifiIP(state, newEspWifiIP) {
      state.espWifiIP = newEspWifiIP;
    },
    setEspIP(state, newEspIP) {
      switch (state.selectedEspMode) {
        case commonEnums.espMode.accessPoint: return state.espAccessPointIP = newEspIP;
        case commonEnums.espMode.wifi: return state.espWifiIP = newEspIP;
        default: throw Error("Invalid ESP mode: " + state.selectedEspMode);
      }
    },
    setSelectedEspMode(state, newSelectedEspMode) {
      state.selectedEspMode = newSelectedEspMode;
    },
    setEspPort(state, newEspPort) {
      state.espPort = newEspPort;
    },
    setEspWifiSSID(state, newEspWifiSSID) {
      state.espWifiSSID = newEspWifiSSID;
    },
    setEspWifiPassword(state, newEspWifiPassword) {
      state.espWifiPassword = newEspWifiPassword;
    },
    setPossibleWifiCredentials(state, possibleWifiCredentials) {
      state.possibleWifiCredentials = possibleWifiCredentials;
    },
    setConnected(state, newState) {
      state.connected = newState;
    },
    setConnectInProgress(state, newState) {
      state.connectInProgress = newState;
    },
    resetTimeoutCounter(state) {
      state.timeoutCount = 0;
    },
    increaseTimeoutCounter(state) {
      if (state.connected) {
        state.timeoutCount++;
        if (state.timeoutCount > 10) {
          state.connected = false;
          console.log("disconnected");
        }
      }
    }
  },

  actions: {
  },

  modules: {
  }
}