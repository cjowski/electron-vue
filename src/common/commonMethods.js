export default {
  getChartHeight(vuetifyBreakpointName) {
    switch (vuetifyBreakpointName) {
      case 'xs': return 200;
      case 'sm': return 230;
      case 'md': return 500;
      case 'lg': return 500;
      case 'xl': return 800;
      default : throw Error("Invalid $vuetify.breakpoint.name: " + vuetifyBreakpointName);
    }
  },
  timeoutFetch(request, timeoutMs, onSuccess, onError, onTimeout) {
    let didTimeOut = false;

    new Promise((resolve, reject) => {
      let timeout = setTimeout(function() {
        didTimeOut = true;
        if (onTimeout) {
          onTimeout();
        }
        reject(new Error('Request timed out'));
      }, timeoutMs);

      fetch(request)
      .then(response => {
          clearTimeout(timeout);
          if (!didTimeOut) {
            resolve(response)
          }
        }
      )
      .catch(error => onError(error));
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(responseJson => onSuccess(responseJson))
    .catch(error => onError(error));
  },
  setFetchDataInterval(request, onSuccess, store, intervalMs) {
    let self = this;
    let finished = true;
    setInterval(function() {
      if (!finished || !store.getters['espConnect/connected']) {
        return;
      }
      finished = false;
      self.timeoutFetch(
        request,
        5000,
        function (dataJson) {
          onSuccess(dataJson);
          finished = true;
        },
        function (error) {
          console.log(error.toString());
          finished = true;
        },
        function () {
          store.commit('espConnect/increaseTimeoutCounter');
        }
      );
    }, intervalMs);
  }
}