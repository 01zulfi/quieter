import React from 'react';
import { initializeApp } from 'firebase/app';
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  query,
  collection,
  where,
  onSnapshot,
} from 'firebase/firestore';
import {
  signInAnonymously,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
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

const getUsername = async () => {
  if (userId === '') return '';

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return '';

  return userSnap.data().username;
};

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

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return { id: 'DEFAULT', username: 'DEFAULT' };

  const {
    id,
    username,
    adminBoxes,
    associatedStrings,
    authoredStrings,
    authoredKnots,
    joinedBoxes,
  } = userSnap.data();
  return {
    id,
    username,
    adminBoxes,
    associatedStrings,
    authoredStrings,
    joinedBoxes,
    authoredKnots,
  };
};

const getNotSignedInUserDoc = async (id: string) => {
  if (id === '') return { id: 'DEFAULT', username: 'DEFAULT' };

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return { id: 'DEFAULT', username: 'DEFAULT' };

  const {
    username,
    adminBoxes,
    associatedStrings,
    authoredStrings,
    authoredKnots,
    joinedBoxes,
  } = userSnap.data();
  return {
    id,
    username,
    adminBoxes,
    associatedStrings,
    authoredStrings,
    joinedBoxes,
    authoredKnots,
  };
};

const createUserDoc = async ({
  username,
  id,
  email,
}: {
  username: string;
  id: string;
  email?: string;
}) => {
  const userData = {
    username,
    id,
    joinedBoxes: [],
    associatedStrings: [],
    authoredKnots: [],
    authoredStrings: [],
    adminBoxes: [],
    email,
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
    location.reload();
  });
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const { user } = result;
      if (!user) return;
      localStorage.setItem('isSignedIn', 'true');
      localStorage.setItem('isAnon', 'false');
      localStorage.setItem('userId', user.uid);
      userId = user.uid;
      if (await doesUserDocExist()) {
        location.reload();
        return;
      }
      createUserDoc({ username: user.displayName || '', id: user.uid });
      location.reload();
      // eslint-disable no-console
    })
    .catch((error) => console.error(error));
};

const signUpWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      localStorage.setItem('isSignedIn', 'true');
      localStorage.setItem('isAnon', 'false');
      localStorage.setItem('userId', user.uid);
      userId = user.uid;
      createUserDoc({ username: user.displayName || '', id: user.uid, email });
      location.reload();
    })
    .catch((error) => {
      localStorage.setItem('isSignedIn', 'false');
      const errorCode = error.code;
      const errorMessage = error.message;
      /* eslint-disable no-console */
      console.log({ errorCode, errorMessage });
    });
};

const signInWithEmail = async ({
  email,
  password,
  setIsError,
}: {
  setIsError: any;
  email: string;
  password: string;
}) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      localStorage.setItem('isSignedIn', 'true');
      localStorage.setItem('isAnon', 'false');
      localStorage.setItem('userId', user.uid);
      location.reload();
    })
    .catch(() => {
      setIsError(true);
    });
};

const checkIfEmailExists = async (email: string) => {
  const usersRef = collection(db, 'users');
  const emailQuery = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(emailQuery);
  let exists = false;
  querySnapshot.forEach((docRef) => {
    exists = docRef.exists();
  });
  return exists;
};

const editUserDoc = async ({ username }: { username: string }) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    username,
  });
};

const getBox = async (boxId: string) => {
  if (boxId === '') return null;

  const boxRef = doc(db, 'boxes', boxId);
  const boxSnap = await getDoc(boxRef);
  if (!boxSnap.exists()) return null;

  const { admin, associatedStrings, description, id, joinedUsers, name } =
    boxSnap.data();
  const hasStrings = associatedStrings ? associatedStrings.length > 0 : false;
  const joinedUsersCount = joinedUsers.length;
  return {
    admin,
    associatedStrings,
    description,
    id,
    joinedUsers,
    name,
    hasStrings,
    joinedUsersCount,
  };
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
    admin: { username: await getUsername(), id: userId },
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
  if (stringId === '') return null;

  const stringRef = doc(db, 'strings', stringId);
  const stringSnap = await getDoc(stringRef);
  if (!stringSnap.exists()) return null;

  const {
    associatedBox,
    associatedKnots,
    id,
    title,
    content,
    author,
    associatedUsers,
    time,
  } = stringSnap.data();
  const hasKnots = associatedKnots ? associatedKnots.length > 0 : false;
  const latestTwoKnots = hasKnots ? associatedKnots.slice(0, 2) : [];
  return {
    associatedBox,
    associatedKnots,
    id,
    title,
    content,
    author,
    hasKnots,
    associatedUsers,
    latestTwoKnots,
    time,
  };
};

const createString = async ({
  title,
  content,
  stringId,
  boxId,
  boxName,
}: {
  title: string;
  content: string;
  boxId: string;
  boxName: string;
  stringId: string;
}) => {
  const stringData = {
    associatedBox: { name: boxName, id: boxId },
    id: stringId,
    title,
    content,
    author: { username: await getUsername(), id: userId },
    associatedUsers: [userId],
    hasKnots: false,
    time: Date.now(),
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
  const boxId = stringData?.associatedBox.id;

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
    author: { username: await getUsername(), id: userId },
    id,
    time: Date.now(),
  };

  await setDoc(doc(db, 'knots', id), knotData);

  const stringRef = doc(db, 'strings', stringId);

  await updateDoc(stringRef, {
    associatedKnots: arrayUnion(id),
  });

  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    authoredKnots: arrayUnion(id),
  });
};

const deleteKnot = async ({
  knotId,
  stringId,
}: {
  knotId: string;
  stringId: string;
}) => {
  const knotRef = doc(db, 'knots', knotId);

  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    authoredKnots: arrayRemove(knotId),
  });

  const stringRef = doc(db, 'strings', stringId);
  await updateDoc(stringRef, {
    associatedKnots: arrayRemove(knotId),
  });

  await deleteDoc(knotRef);
};

const listenForUserChanges = () => (setStateFunction: any) => {
  const userRef = doc(db, 'users', userId);
  const unsub = onSnapshot(userRef, async () => {
    const data = await getUserDoc();
    setStateFunction(data);
  });
  return () => () => unsub();
};

const listenForStringChanges =
  (stringId: string) => (setStateFunction: any) => {
    const stringRef = doc(db, 'strings', stringId);
    const unsub = onSnapshot(stringRef, async () => {
      const data = await getString(stringId);
      setStateFunction(data);
    });
    return () => () => unsub();
  };

const listenForBoxChanges = (boxId: string) => (setStateFunction: any) => {
  const boxRef = doc(db, 'boxes', boxId);
  const unsub = onSnapshot(boxRef, async () => {
    const data = await getBox(boxId);
    setStateFunction(data);
  });
  return () => () => unsub();
};

const deleteBox = async (boxId: string) => {
  const boxRef = doc(db, 'boxes', boxId);

  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    adminBoxes: arrayRemove(boxId),
    joinedBoxes: arrayRemove(boxId),
  });

  const boxData = await getBox(boxId);

  if (boxData?.hasStrings) {
    const stringIds = boxData?.associatedStrings;
    stringIds.forEach(async (stringId: string) => {
      await deleteString(stringId);
    });
  }

  await deleteDoc(boxRef);
};

const getFeedStrings = async () => {
  const user = await getUserDoc();
  const boxStrings: string[] = [];

  user.joinedBoxes.forEach(async (boxId: string) => {
    const box = await getBox(boxId);
    if (box) {
      boxStrings.concat(box.associatedStrings);
    }
  });

  const allStrings = [...user.associatedStrings, ...boxStrings];

  const uniqueArray = allStrings.filter(
    (item: any, index: any, self: any) => self.indexOf(item) === index,
  );

  return uniqueArray;
};

const firebase = {
  isUserSignedIn,
  isUserAnon,
  signOutUser,
  updateStateUponSignIn,
  getUserDoc,
  editUserDoc,
  signInAsGuest,
  signInWithGoogle,
  signUpWithEmail,
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
  deleteKnot,
  listenForStringChanges,
  getNotSignedInUserDoc,
  getFeedStrings,
  checkIfEmailExists,
  listenForUserChanges,
  listenForBoxChanges,
};

export default firebase;
