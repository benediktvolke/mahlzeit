import store from 'src/store';
import { auth } from 'src/firebase';

export default async () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      store.dispatch('user/fetchProfile', user);
      store.commit('user/setIsLoggedIn', true);
    } else {
      store.commit('user/setIsLoggedIn', false);
    }
  });
};
