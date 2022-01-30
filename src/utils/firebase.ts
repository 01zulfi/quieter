import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import uniqueId from './unique-id';

const db = getFirestore();
const userId = '';

const getBox = async (boxId: string) => {
  const boxRef = doc(db, 'boxes', boxId);
  const boxSnap = await getDoc(boxRef);
  return boxSnap.data();
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
};

export default firebase;
