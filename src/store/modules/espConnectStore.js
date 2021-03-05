import commonEnums from "@/common/enums"

export default {
  namespaced: true,
  
  state: {
    espAccessPointIP: "192.168.4.1",
    espWifiIP: "192.168.1.45",
    espPort: "80",
    selectedEspMode: 0,
    connected: false
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
    espRequestPath: (state, getters) => {
      return "http://" + getters.espIP + ":" + state.espPort + "/";
    },
    selectedEspMode: state => {
      return state.selectedEspMode;
    },
    connected: state => {
      return state.connected;
    }
  },

  mutations: {
    setEspIP(state, newEspIP) {
      state.espIP = newEspIP;
    },
    setSelectedEspMode(state, newSelectedEspMode) {
      state.selectedEspMode = newSelectedEspMode;
    },
    setEspPort(state, newEspPort) {
      state.espPort = newEspPort;
    },
    setConnected(state, newState) {
      state.connected = newState;
    }
  },

  actions: {
  },

  modules: {
  }
}