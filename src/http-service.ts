import axios from "axios";

class ServiceProvider {
  constructor(
    private apiUri: string = "https://erp.pearlorganisation.in/public/technology-floor1-api",
    private controller: AbortController = new AbortController()
  ) {}

  getErpDepartmentData() {
    return new Promise((resolve, reject) => {
      axios
        .get(this.apiUri, { signal: this.controller.signal })
        .then((success) => {
          resolve(success.data);
        })
        .catch((err) => reject(err));
    });
  }
  abortRequest() {
    this.controller.abort();
  }
}

export default new ServiceProvider();
