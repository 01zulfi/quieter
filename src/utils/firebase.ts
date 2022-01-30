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

  await updateDoc(boxRef, {
    joinedUsers: arrayUnion(userId),
  });
};

const leaveBox = async (boxId: string) => {
  const boxRef = doc(db, 'boxes', boxId);

  await updateDoc(boxRef, {
    joinedUsers: arrayRemove(userId),
  });
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
};

export default firebase;
