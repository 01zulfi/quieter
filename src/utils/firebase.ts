import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
  // TODO: add authoredString, associatedString in "users"
  // TODO: add associatedUsers in "strings"
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

const firebase = {
  getString,
  createString,
  editString,
  getBox,
  joinBox,
  leaveBox,
  createBox,
  deleteBox,
  editBox,
  getBoxStrings,
};

export default firebase;
