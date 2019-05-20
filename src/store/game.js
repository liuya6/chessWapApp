const Game = {
  state: {
    gameList: "",
    gameUrl: "", //游戏url
    gameType: "", //游戏类型
    gameTitle: "" //游戏名称
  },
  getters: {
    gameList: state => {
      return state.gameList;
    },
    gameUrl: state => {
      return state.gameUrl;
    },
    gameType: state => {
      return state.gameType;
    },
    gameTitle: state => {
      return state.gameTitle;
    }
  },
  mutations: {
    SET_GAME_LIST(state, payload) {
      console.log(state, payload, "store");
      state.gameList = payload;
    },
    SET_GAME_URL: (state, payload) => {
      state.gameUrl = payload;
    },
    SET_GAME_TYPE: (state, payload) => {
      state.gameType = payload;
    },
    SET_GAME_TITLE(state, payload) {
      state.gameTitle = payload;
    }
  },
  actions: {}
};
export default Game;
