export default {
  created() {
    this.$store.dispatch('robots/getParts');
  },
  computed: {
    parts() {
      const INITIAL_STATE = {
        heads: [],
        arms: [],
        torsos: [],
        bases: [],
      };

      return this.$store.state.robots.parts || INITIAL_STATE;
    },
  },
};
