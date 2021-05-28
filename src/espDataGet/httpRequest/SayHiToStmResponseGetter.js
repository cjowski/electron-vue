import fetchMethods from "@/common/fetchMethods"

export class SayHiToStmResponseGetter {

  constructor(store, maxRequestsCount, setStmGreeting, setError) {
    this.store = store;
    this.fetchInterval = null;
    this.maxRequestsCount = maxRequestsCount;
    this.doneRequestsCount = 0;
    this.setStmGreeting = setStmGreeting;
    this.setError = setError;
  }

  startFetching(requestPath) {
    let self = this;
    self.doneRequestsCount = 0;

    if (this.fetchInterval != null) {
      clearInterval(this.fetchInterval);
    }

    this.fetchInterval = fetchMethods.setFetchDataInterval(
      requestPath,
      function (response) {
        if (response == null) {
          self.setError("NULL response");
          self.stopFetching();
        }
        else if (response.Done) {
          self.setStmGreeting(response.Greeting);
          self.stopFetching();
        }
        if (++self.doneRequestsCount > self.maxRequestsCount) {
          self.stopFetching();
          self.setError("Reached maximum requests");
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