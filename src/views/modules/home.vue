<template>
  <div class="home">{{users}}-{{users.role}}</div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      users: this.$store.getters.TOKEN
    };
  },
  methods: {}
};
</script>

<style scoped lang="stylus">
.home {
  width: 1000px;
  margin: 0 auto;
}
</style>