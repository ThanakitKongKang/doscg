<template>
  <div id="app">
    <b-navbar
      toggleable="md"
      type="dark"
      variant="dark"
    >
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">My Vue App</b-navbar-brand>
      <b-collapse
        is-nav
        id="nav_collapse"
      >
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/one">answer 1</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />
    <div>
      <b-card
        title="Footer"
        sub-title="Thanakit Chamkromwattanakool"
        id="footer"
        bg-variant="dark"
        text-variant="white"
      >
        <b-card-text>
          for <em>TEST</em> purposes only.
        </b-card-text>
        <b-card-text> &copy; {{ new Date().getFullYear() }}</b-card-text>
      </b-card>
    </div>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
