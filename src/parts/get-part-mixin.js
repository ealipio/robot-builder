export default {
  created() {
    this.$store.dispatch('getParts');
  },
  computed: {
    parts() {
      const INITIAL_STATE = {
        heads: [],
        arms: [],
        torsos: [],
        bases: [],
      };

      return this.$store.state.parts || INITIAL_STATE;
    },
  },
};
