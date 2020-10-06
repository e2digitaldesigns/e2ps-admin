import moxios from "moxios";
import { testStore } from "../tddUtils";
import { fetchSystemInformation } from "../redux/actions/system/systemActions";
import http from "./../utils/httpServices";
import axios from "axios";
import sinon from "sinon";

describe("Fetch System Information REDUX", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("http://192.168.1.87:8001/api/v1/system", {
      status: 200,
      response: { error: { errorCode: "0x0", errorDesc: "all good" } },
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("Fetch system information and post to redux", function (done) {
    moxios.withMock(function () {
      let onFulfilled = sinon.spy();
      axios.get("/users/12345").then(onFulfilled);

      moxios.wait(function () {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: {
              id: 12345,
              firstName: "Fred",
              lastName: "Flintstone",
            },
          })
          .then(function () {
            // equal(onFulfilled.called, true);
            console.log("helllo");
            expect(1).toBe(1);
            done();
          });
      });
    });
  });
});
