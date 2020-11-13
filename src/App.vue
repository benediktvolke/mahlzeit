<template>
  <div id="q-app">
    <router-view v-if="isLoggedIn" />

    <q-inner-loading v-else showing>
      <q-spinner color="primary" size="5em" />
    </q-inner-loading>

    <app-login-dialog />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { AppUpdater } from 'mixins/AppUpdater';
import AppLoginDialog from 'components/AppLoginDialog';

export default {
  name: 'App',

  components: { AppLoginDialog },

  mixins: [AppUpdater],

  computed: {
    ...mapState({
      isLoggedIn: (state) => state.user.isLoggedIn,
    }),
  },
};
</script>
