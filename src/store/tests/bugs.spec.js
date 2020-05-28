import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, resolveBug, unresolvedBUgsSelector, loadBugs } from "../bugs";
import configureStore from "../configureStore";

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });
  const getBugs = () => store.getState().entities.bugs;
  const createState = () => {
    return {
      entities: {
        bugs: {
          list: [],
          lastFetch: Date.now(),
        },
      },
    };
  };

  it("should add a bug to the store if it is saved to the server", async () => {
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };

    fakeAxios.onPost("/bugs").reply(200, savedBug);
    await store.dispatch(addBug(bug));

    expect(getBugs().list).toContainEqual(savedBug);
  });

  it("should not add a bug to the store if it is not saved to the server", async () => {
    const bug = { description: "a" };

    fakeAxios.onPost("/bugs").reply(500);
    await store.dispatch(addBug(bug));

    expect(getBugs().list).toHaveLength(0);
  });

  describe("Selectors", () => {
    it("should return unresolved bugs", () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1 },
        { id: 2 },
        { id: 3, resolved: true },
      ];
      const expected = unresolvedBUgsSelector(state);

      expect(expected).toHaveLength(2);
    });
  });

  it("should resolve a given bug if it's saved to the server", async () => {
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    fakeAxios.onPatch(`/bugs/1`).reply(200, { id: 1, resolved: true });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(getBugs().list[0].resolved).toBe(true);
  });

  it("should not resolve a given bug if it's not saved to the server", async () => {
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    fakeAxios.onPatch(`/bugs/1`).reply(500);

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(getBugs().list[0].resolved).not.toBe(true);
  });

  describe("loadBugs", () => {
    it("should come from the cach if they exist in the cach", async () => {
      fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

      await store.dispatch(loadBugs());
      await store.dispatch(loadBugs());

      expect(fakeAxios.history.get.length).toBe(1);
    });
    it("should add the bugs to the store if they are loaded from the server", async () => {
      const bugs = [{ id: 1 }, { id: 2 }];

      fakeAxios.onGet("/bugs").reply(200, bugs);
      await store.dispatch(loadBugs());

      expect(getBugs().list).toMatchObject(bugs);
    });
    it("should set loading to true when loading", () => {
      fakeAxios.onGet("/bugs").reply(() => {
        expect(getBugs().loading).toBe(true);
        return [200, [{ id: 1 }]];
      });

      store.dispatch(loadBugs());
    });
    it("should set loading to false when done loading", async () => {
      fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);
      await store.dispatch(loadBugs());

      expect(getBugs().loading).toBe(false);
    });

    it("should set loading to false when there is an server error", async () => {
      fakeAxios.onGet("/bugs").reply(500);
      await store.dispatch(loadBugs());

      expect(getBugs().loading).toBe(false);
    });
  });
});
