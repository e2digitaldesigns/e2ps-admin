import moxios from "moxios";
import { testStore } from "../tddUtils";
import { fetchSystemInformation } from "../redux/actions/system/systemActions";

describe("Fetch System Information REDUX", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("Store is updated correctly", () => {
    const expectedState = {
      pending: false,
      systemLoaded: false,
      storeOwnerId: "",
      defaultStoreFrontId: "",
      defaultStoreFrontName: "",
      storeFronts: [],
      error: {
        errorCode: "0x2",
        errorDesc: "Email and Password do not match...",
      },
    };

    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(fetchSystemInformation()).then(() => {
      const newState = store.getState();
      expect(newState.system).toStrictEqual(expectedState);
    });
  });
});

