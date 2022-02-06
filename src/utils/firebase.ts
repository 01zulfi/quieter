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
} from 'firebase/auth';
import uniqueId from './unique-id';

const db = getFirestore();
let userId = '';
let userAnon = false;

const isUserSignedIn = () => userId !== '';

const isUserAnon = () => userAnon;

const getUserDoc = async () => {
  if (isUserAnon()) return { id: 'DEFAULT', username: 'DEFAULT' };
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.data() || { id: 'DEFAULT', username: 'DEFAULT' };
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
  const auth = getAuth();
  signInAnonymously(auth);
  onAuthStateChanged(auth, (user) => {
    userId = user?.uid || '';
  });
  userAnon = true;
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth).then((result) => {
    if (!result) return;
    const { user } = result;
    userId = user.uid;
    if (!getUserDoc()) {
      createUserDoc({ username: user.displayName || '', id: user.uid });
    }
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
    .then((userCredential) => {
      const { user } = userCredential;
      userId = user.uid;
      if (!getUserDoc()) {
        createUserDoc({ username: user.displayName || '', id: user.uid });
      }
    })
    .catch((error) => {
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
