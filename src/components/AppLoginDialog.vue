<template>
  <q-dialog
    :value="!isLoggedIn"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <component :is="activeForm" @change-form-to="changeForm"></component>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex';
import LoginForm from './AppLoginDialog/LoginForm';
import SignupForm from './AppLoginDialog/SignupForm';
import PasswordResetForm from './AppLoginDialog/PasswordResetForm';

export default {
  name: 'AppLoginDialog',

  components: {
    LoginForm,
    SignupForm,
    PasswordResetForm,
  },

  data: () => ({
    activeForm: 'LoginForm',
  }),

  computed: {
    ...mapState({
      isLoggedIn: (state) => state.user.isLoggedIn,
    }),
  },

  methods: {
    changeForm(form) {
      this.activeForm = form;
    },
  },
};
</script>
