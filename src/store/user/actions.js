import { auth, usersCollection } from 'src/firebase';
import router from 'src/router';

export async function login({ dispatch, commit }, { email, password }) {
  // sign user in
  const { user } = await auth.signInWithEmailAndPassword(email, password);

  // fetch user profile and set in state
  dispatch('fetchProfile', user);
  commit('setIsLoggedIn', true);

  router.push('/');
}

export async function signup({ dispatch, commit }, { name, email, password }) {
  // sign user up
  const { user } = await auth.createUserWithEmailAndPassword(email, password);

  user.sendEmailVerification();

  // create user profile object in userCollections
  await usersCollection.doc(user.uid).set({
    name: name,
  });

  // fetch user profile and set in state
  dispatch('fetchProfile', user);
  commit('setIsLoggedIn', true);
}

export async function logout({ commit }) {
  await auth.signOut();

  // clear userProfile
  commit('setProfile', {});
  commit('setIsLoggedIn', false);
}

export async function fetchProfile({ commit }, user) {
  // fetch user profile
  const profile = await usersCollection.doc(user.uid).get();

  // set user profile in state
  commit('setProfile', { ...profile.data(), email: user.email, id: user.uid });
}
