<template>
  <q-card>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>{{ $t('auth.create-account') }}</q-toolbar-title>
    </q-toolbar>

    <q-card-section v-if="errorMsg">
      <q-banner inline-actions class="text-white bg-negative">
        {{ errorMsg }}
      </q-banner>
    </q-card-section>

    <q-form @submit="signup">
      <q-card-section class="q-gutter-md">
        <q-input v-model="name" filled :label="$t('user.name')" />

        <q-input v-model="email" filled :label="$t('user.email')" />

        <q-input
          v-model="password"
          filled
          :type="showPassword ? 'text' : 'password'"
          :label="$t('user.password')"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions>
        <q-btn
          flat
          :label="$t('auth.back-to-login')"
          :disable="loading"
          color="primary"
          @click="$emit('change-form-to', 'LoginForm')"
        />

        <q-space />

        <q-btn
          :label="$t('auth.signup')"
          type="submit"
          color="primary"
          :loading="loading"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: 'SignupForm',

  data: () => ({
    loading: false,
    name: '',
    email: '',
    password: '',
    showPassword: false,
    errorMsg: '',
  }),

  methods: {
    async signup() {
      this.loading = true;

      try {
        await this.$store.dispatch('user/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
      } catch (e) {
        switch (e.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
          case 'auth/operation-not-allowed':
          case 'auth/weak-password':
            this.errorMsg = this.$t('firebase-errors.' + e.code);
            break;

          default:
            this.errorMsg = this.$t('firebase-errors.unknown', {
              code: e.code,
            });
            break;
        }
      }

      this.loading = false;
    },
  },
};
</script>
