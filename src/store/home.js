const Home = {
  state: {
    isOpen: 0,
    initHomeData: "",
    webName: "",
    kefuGG: ""
  },
  getters: {
    isOpen: state => {
      return state.isOpen;
    },
    initHomeData: state => {
      return state.initHomeData;
    },
    webName: state => {
      return state.webName;
    },
    kefuGG: state => {
      return state.kefuGG;
    }
  },
  mutations: {
    CHANGE_OPEN: (state, payload) => {
      state.isOpen = !payload;
    },
    SET_HOME_DATA: (state, payload) => {
      state.initHomeData = payload;
    },
    SET_WEB_NAME: (state, payload) => {
      state.webName = payload;
    },
    SET_KEFU_GG: (state, payload) => {
      state.kefuGG = payload;
    }
  },
  actions: {}
};
export default Home;
