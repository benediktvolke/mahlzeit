<template>
  <q-card>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>{{ $t('auth.login') }}</q-toolbar-title>

      <q-btn
        dense
        flat
        :label="$t('auth.forgot-password')"
        :disable="loading"
        @click="$emit('change-form-to', 'PasswordResetForm')"
      />
    </q-toolbar>

    <q-card-section v-if="errorMsg">
      <q-banner inline-actions class="text-white bg-negative">
        {{ errorMsg }}
      </q-banner>
    </q-card-section>

    <q-form @submit="login">
      <q-card-section class="q-gutter-md">
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
          :label="$t('auth.create-account')"
          :disable="loading"
          color="primary"
          @click="$emit('change-form-to', 'SignupForm')"
        />

        <q-space />

        <q-btn
          :label="$t('auth.login')"
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
  name: 'LoginForm',

  data: () => ({
    loading: false,
    email: '',
    password: '',
    showPassword: false,
    errorMsg: '',
  }),

  methods: {
    async login() {
      this.loading = true;

      try {
        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password,
        });
      } catch (e) {
        switch (e.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
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
