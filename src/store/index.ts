import { createStore } from 'vuex';

export default createStore({
  state: {
    richText: '',
  },
  mutations: {
    SET_RICH_TEXT: (st, richText) => {
      st.richText = richText;
    },
  },
  actions: {
  },
  modules: {
  },
});
