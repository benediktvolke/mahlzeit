<template>
  <q-card>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>{{ $t('auth.reset-password') }}</q-toolbar-title>
    </q-toolbar>

    <q-card-section v-if="errorMsg">
      <q-banner inline-actions class="text-white bg-negative">
        {{ errorMsg }}
      </q-banner>
    </q-card-section>

    <q-form @submit="resetPassword">
      <q-card-section v-if="showSuccess">
        <q-banner inline-actions class="text-white bg-positive">
          {{ $t('auth.reset-password-success') }}
        </q-banner>
      </q-card-section>

      <q-card-section v-else class="q-gutter-md">
        <p>{{ $t('auth.reset-password-desc') }}</p>

        <q-input
          v-model="email"
          :disable="loading"
          filled
          :label="$t('user.email')"
        />
      </q-card-section>

      <q-card-actions>
        <q-btn
          :flat="!showSuccess"
          :label="$t('auth.back-to-login')"
          color="primary"
          :disable="loading"
          @click="$emit('change-form-to', 'LoginForm')"
        />

        <q-space />

        <q-btn
          v-if="!showSuccess"
          :label="$t('auth.reset-password-submit')"
          type="submit"
          color="primary"
          :loading="loading"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { auth } from 'src/firebase';

export default {
  name: 'PasswordResetForm',

  data: () => ({
    loading: false,
    showSuccess: false,
    errorMsg: '',
    email: '',
  }),

  methods: {
    async resetPassword() {
      this.loading = true;

      try {
        await auth.sendPasswordResetEmail(this.email);

        this.showSuccess = true;
        this.errorMsg = '';
      } catch (e) {
        switch (e.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
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
