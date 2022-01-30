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
import uniqueId from './unique-id';

const db = getFirestore();
const userId = '';

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
}: {
  name: string;
  description: string;
}) => {
  const id = uniqueId();
  const boxData = {
    admin: userId,
    id,
    name,
    description,
    hasStrings: false,
    joinedUsers: [userId],
    joinedUsersCount: 1,
  };

  await setDoc(doc(db, 'boxes', id), boxData);

  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    adminBoxes: arrayUnion(id),
    joinedBoxes: arrayUnion(id),
  });
};

const deleteBox = async () => {
  // delete box
  // delete from adminBoxes joinedBoxes in 'users'
  // delete strings
  // delete knots
  // delete relevant fields in 'users'
};

const editBox = async (
  boxId: string,
  { name, description }: { name: string; description: string },
) => {
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

const createString = async (
  boxId: string,
  { title, content }: { title: string; content: string },
) => {
  const id = uniqueId();
  const stringData = {
    associatedBox: boxId,
    id,
    title,
    content,
    author: userId,
    associatedUsers: [userId],
    hasKnots: false,
  };

  await setDoc(doc(db, 'strings', id), stringData);

  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    authoredStrings: arrayUnion(id),
    associatedStrings: arrayUnion(id),
  });

  const boxRef = doc(db, 'boxes', 'boxId');

  await updateDoc(boxRef, {
    associatedStrings: arrayUnion(id),
  });
};

const editString = async (
  stringId: string,
  { title, content }: { title: string; content: string },
) => {
  const stringRef = doc(db, 'strings', stringId);

  await updateDoc(stringRef, {
    title,
    content,
  });
};

const deleteString = async (stringId: string) => {
  const stringRef = doc(db, 'strings', stringId);
  // TODO: delete from authoredStrings associatedStrings in 'users'
  // delete associatedKnots
  // remove from associatedStrings in 'boxes
  await deleteDoc(stringRef);
};

const getKnot = async (knotId: string) => {
  const knotRef = doc(db, 'knots', knotId);
  const knotSnap = await getDoc(knotRef);
  return knotSnap.data();
};

const createKnot = async (
  stringId: string,
  { content }: { content: string },
) => {
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

const firebase = {
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
