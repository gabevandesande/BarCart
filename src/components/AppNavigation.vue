<template>
  <span>
    <!-- <v-navigation-drawer
      app
      v-model="drawer"
      dark
      disable-resize-watcher
      style="box-shadow: none"
    >
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index">
            <v-list-tile-content>
              {{ item.title }}
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar app color="white" flat>
        <v-spacer></v-spacer>
      <div class="d-flex justify-self-center" style="width:1366px">
        <span color="black" class="font-weight-bold headline">BarCart</span>
        <v-spacer class="hidden-sm-and-down"></v-spacer>
        <v-btn text class="hidden-sm-and-down">SIGN IN</v-btn>
        <v-btn class="hidden-sm-and-down">JOIN</v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
  </span>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      drawer: false,
      items: [{ title: "Menu" }, { title: "Sign In" }, { title: "Join" }],
    };
  },
};
</script>

<style scoped>
</style>