<template>
  <q-page class="flex flex-center">
    <q-btn :label="$t('auth.logout')" @click="logout" />
  </q-page>
</template>

<script>
export default {
  name: 'ProfilePage',

  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
};
</script>
