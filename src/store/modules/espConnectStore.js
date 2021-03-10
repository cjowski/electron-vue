import commonEnums from "@/common/enums"

export default {
  namespaced: true,
  
  state: {
    espAccessPointIP: "",
    espWifiIP: "",
    espPort: "",
    espWifiSSID: "",
    espWifiPassword: "",
    selectedEspMode: 0,
    connected: false,
    connectInProgress: false
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
        case commonEnums.espModes.accessPoint: return state.espAccessPointIP;
        case commonEnums.espModes.wifi: return state.espWifiIP;
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
    espRequestPath: (state, getters) => {
      return "http://" + getters.espIP + ":" + state.espPort + "/";
    },
    selectedEspMode: state => {
      return state.selectedEspMode;
    },
    connected: state => {
      return state.connected;
    },
    accessPointConnected: state => {
      return state.connected && state.selectedEspMode == commonEnums.espModes.accessPoint;
    },
    wifiConnected: state => {
      return state.connected && state.selectedEspMode == commonEnums.espModes.wifi;
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
        case commonEnums.espModes.accessPoint: return state.espAccessPointIP = newEspIP;
        case commonEnums.espModes.wifi: return state.espWifiIP = newEspIP;
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
    setConnected(state, newState) {
      state.connected = newState;
    },
    setConnectInProgress(state, newState) {
      state.connectInProgress = newState;
    }
  },

  actions: {
  },

  modules: {
  }
}