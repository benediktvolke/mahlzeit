<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated>
      <q-tabs>
        <q-route-tab icon="room_service" to="/" exact />
        <q-route-tab icon="person" to="/profile" exact />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>
