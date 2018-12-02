import { observable } from "mobx";

const appStore = observable({
  count: 0,
  increment: function() {
    this.count++;
  },
  decrease: function() {
    this.count--;
  }
});

export default appStore;
