export const AppUpdater = {
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },

  created() {
    document.addEventListener('serviceWorkerUpdated', this.updateAvailable, {
      once: true,
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;

      this.refreshing = true;

      window.location.reload();
    });
  },

  methods: {
    updateAvailable(event) {
      this.registration = event.detail;
      this.updateExists = true;

      this.showNotification();
    },

    updateApp() {
      this.updateExists = false;

      if (!this.registration || !this.registration.waiting) return;

      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    },

    showNotification() {
      this.$q.notify({
        message: this.$t('update-available'),
        color: 'primary',
        timeout: 0,
        actions: [
          {
            label: this.$t('update'),
            color: 'white',
            handler: () => {
              this.updateApp();
            },
          },
        ],
      });
    },
  },
};
