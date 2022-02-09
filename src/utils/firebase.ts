import React from 'react';
import { initializeApp } from 'firebase/app';
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';
import {
  signInWithRedirect,
  signInAnonymously,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import uniqueId from './unique-id';
import firebaseConfig from './firebase-config';

initializeApp(firebaseConfig);
const db = getFirestore();

let userId = (() => {
  if (localStorage.getItem('isSignedIn') === 'true') {
    const id = localStorage.getItem('userId');
    if (!id) return '';
    return id;
  }
  return '';
})();

let userAnon = (() => {
  if (localStorage.getItem('isSignedIn') === 'true') {
    if (localStorage.getItem('isAnon') === 'true') return true;
    return false;
  }
  return false;
})();

const isUserSignedIn = () => userId !== '';

const isUserAnon = () => userAnon;

const signOutUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      userId = '';
      userAnon = false;
      localStorage.setItem('isSignedIn', 'false');
      localStorage.setItem('userId', '');
      localStorage.setItem('isAnon', 'false');
    })
    /* eslint-disable no-console */
    .catch((error: any) => console.log(error));
};

const updateStateUponSignIn =
  (setStateFunction: React.Dispatch<any>) => (stateValue: any) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      userId = user.uid;
      setStateFunction(stateValue);
      localStorage.setItem('isSignedIn', 'true');
    });
  };

const doesUserDocExist = async () => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
};

const getUserDoc = async () => {
  if (isUserAnon()) return { id: 'DEFAULT', username: 'DEFAULT' };
  console.log(userId);
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) return { id: 'DEFAULT', username: 'DEFAULT' };
  const { id, username } = userSnap.data() || {
    id: 'DEFAULT',
    username: 'DEFAULT',
  };
  return { id, username };
};

const createUserDoc = async ({
  username,
  id,
}: {
  username: string;
  id: string;
}) => {
  const userData = {
    username,
    id,
    joinedBoxes: [],
    associatedStrings: [],
    authoredKnots: [],
    authoredStrings: [],
    adminBoxes: [],
  };

  await setDoc(doc(db, 'users', id), userData);
};

const signInAsGuest = async () => {
  userAnon = true;
  const auth = getAuth();
  signInAnonymously(auth);
  onAuthStateChanged(auth, (user) => {
    if (!user) return;
    userId = user.uid;
    localStorage.setItem('isSignedIn', 'true');
    localStorage.setItem('isAnon', 'true');
    localStorage.setItem('userId', userId);
  });
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth).then(async (result) => {
    if (!result) return;
    const { user } = result;
    localStorage.setItem('isSignedIn', 'true');
    localStorage.setItem('isAnon', 'false');
    localStorage.setItem('userId', user.uid);
    userId = user.uid;
    if (await doesUserDocExist()) return;
    createUserDoc({ username: user.displayName || '', id: user.uid });
  });
};

const signInWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const { user } = userCredential;
      localStorage.setItem('isSignedIn', 'true');
      localStorage.setItem('isAnon', 'false');
      localStorage.setItem('userId', user.uid);
      userId = user.uid;
      if (await doesUserDocExist()) return;
      createUserDoc({ username: user.displayName || '', id: user.uid });
    })
    .catch((error) => {
      localStorage.setItem('isSignedIn', 'false');
      const errorCode = error.code;
      const errorMessage = error.message;
      /* eslint-disable no-console */
      console.log({ errorCode, errorMessage });
    });
};

const getBox = async (boxId: string) => {
  const boxRef = doc(db, 'boxes', boxId);
  const boxSnap = await getDoc(boxRef);
  return boxSnap.data();
};

const joinBox = async (boxId: string) => {
  const boxRef = doc(db, 'boxes', boxId);
  const userRef = doc(db, 'users', userId);

  await updateDoc(boxRef, {
    joinedUsers: arrayUnion(userId),
  });

  await updateDoc(userRef, {
    joinedBoxes: arrayUnion(boxId),
  });
};

const leaveBox = async (boxId: string) => {
  const boxRef = doc(db, 'boxes', boxId);
  const userRef = doc(db, 'users', userId);

  await updateDoc(boxRef, {
    joinedUsers: arrayRemove(userId),
  });

  await updateDoc(userRef, {
    joinedBoxes: arrayRemove(boxId),
  });
};

const createBox = async ({
  name,
  description,
  boxId,
}: {
  name: string;
  description: string;
  boxId: string;
}) => {
  const boxData = {
    admin: userId,
    id: boxId,
    name,
    description,
    hasStrings: false,
    joinedUsers: [userId],
    joinedUsersCount: 1,
  };

  await setDoc(doc(db, 'boxes', boxId), boxData);

  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    adminBoxes: arrayUnion(boxId),
    joinedBoxes: arrayUnion(boxId),
  });
};

const editBox = async ({
  boxId,
  name,
  description,
}: {
  name: string;
  description: string;
  boxId: string;
}) => {
  const boxRef = doc(db, 'boxes', boxId);

  await updateDoc(boxRef, {
    name,
    description,
  });
};

const getBoxStrings = async (boxId: string) => {
  const box = await getBox(boxId);
  return box?.associatedStrings;
};

const getString = async (stringId: string) => {
  const stringRef = doc(db, 'strings', stringId);
  const stringSnap = await getDoc(stringRef);
  return stringSnap.data();
};

const createString = async ({
  title,
  content,
  stringId,
  boxId,
}: {
  title: string;
  content: string;
  boxId: string;
  stringId: string;
}) => {
  const stringData = {
    associatedBox: boxId,
    stringId,
    title,
    content,
    author: userId,
    associatedUsers: [userId],
    hasKnots: false,
  };

  await setDoc(doc(db, 'strings', stringId), stringData);

  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    authoredStrings: arrayUnion(stringId),
    associatedStrings: arrayUnion(stringId),
  });

  const boxRef = doc(db, 'boxes', boxId);

  await updateDoc(boxRef, {
    associatedStrings: arrayUnion(stringId),
  });
};

const editString = async ({
  stringId,
  title,
  content,
}: {
  title: string;
  content: string;
  stringId: string;
}) => {
  const stringRef = doc(db, 'strings', stringId);

  await updateDoc(stringRef, {
    title,
    content,
  });
};

const deleteString = async (stringId: string) => {
  const stringRef = doc(db, 'strings', stringId);

  const stringData = await getString(stringId);
  const boxId = stringData?.associatedBox;

  const boxRef = doc(db, 'boxes', boxId);

  await updateDoc(boxRef, {
    associatedStrings: arrayRemove(stringId),
  });

  await deleteDoc(stringRef);

  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    authoredStrings: arrayRemove(stringId),
    associatedStrings: arrayRemove(stringId),
  });

  const knotIds = stringData?.associatedKnots;
  knotIds.forEach(async (knotId: string) => {
    const knotRef = doc(db, 'knots', knotId);
    await updateDoc(userRef, {
      associatedKnots: arrayRemove(knotId),
    });
    await deleteDoc(knotRef);
  });
};

const getKnot = async (knotId: string) => {
  const knotRef = doc(db, 'knots', knotId);
  const knotSnap = await getDoc(knotRef);
  return knotSnap.data();
};

const createKnot = async ({
  stringId,
  content,
}: {
  content: string;
  stringId: string;
}) => {
  const id = uniqueId();
  const knotData = {
    associatedString: stringId,
    content,
    author: userId,
    id,
  };

  await setDoc(doc(db, 'knots', id), knotData);

  const stringRef = doc(db, 'strings', stringId);

  await updateDoc(stringRef, {
    associatedKnots: arrayUnion(id),
  });
};

const deleteBox = async (boxId: string) => {
  const boxRef = doc(db, 'boxes', boxId);

  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    adminBoxes: arrayRemove(boxId),
    joinedBoxes: arrayRemove(boxId),
  });

  const boxData = await getBox(boxId);
  const stringIds = boxData?.associatedStrings;

  stringIds.forEach(async (stringId: string) => {
    await deleteString(stringId);
  });

  await deleteDoc(boxRef);
};

const firebase = {
  isUserSignedIn,
  isUserAnon,
  signOutUser,
  updateStateUponSignIn,
  getUserDoc,
  signInAsGuest,
  signInWithGoogle,
  signInWithEmail,
  getString,
  createString,
  editString,
  deleteString,
  getBox,
  joinBox,
  leaveBox,
  createBox,
  deleteBox,
  editBox,
  getBoxStrings,
  getKnot,
  createKnot,
};

export default firebase;
