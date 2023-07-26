import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Email Change
export const doEmailUpdate = (email) =>
  auth.currentUser.updateEmail(email);

// Password Check
export const doCheckPassword = (password) =>
  auth.currentUser.reauthenticateWithCredential(
    auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    )
  );

// Password Update
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);
