<template>
  <div id="app">
    <div class="wrapper">
      <b-navbar
        toggleable="md"
        type="dark"
        variant="dark"
        id="navbar"
      >
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">DOSCG</b-navbar-brand>
        <b-collapse
          is-nav
          id="nav_collapse"
        >
          <b-navbar-nav>
            <b-nav-item
              exact
              exact-active-class="active"
              to="/miss-no"
            >1. Missing Numbers</b-nav-item>
            <b-nav-item
              exact
              exact-active-class="active"
              to="/find-val"
            >2. Find Values</b-nav-item>
            <b-nav-item
              exact
              exact-active-class="active"
              to="/google-maps"
            >3. Gooogle API</b-nav-item>
            <b-nav-item
              exact
              exact-active-class="active"
              to="/line-bot"
            >4. Line Bot</b-nav-item>
            <b-nav-item
              exact
              exact-active-class="active"
              to="/cv"
            >CV</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <!-- routes will be rendered here -->
      <router-view />
      <div class="push"></div>
    </div>
    <div class="footer">
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
  margin: 0;
}
.wrapper {
  min-height: 100%;
  margin-bottom: -50px;
}
.footer,
.push {
  height: 50px;
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
  width: 100%;
}
#navbar {
  margin-bottom: 1rem;
}
.title {
  margin: 1rem 0;
}
</style>
