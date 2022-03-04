import zero from '../assets/icons/avatars/00.svg';
import one from '../assets/icons/avatars/01.svg';
import two from '../assets/icons/avatars/02.svg';
import three from '../assets/icons/avatars/03.svg';
import four from '../assets/icons/avatars/04.svg';
import five from '../assets/icons/avatars/05.svg';
import six from '../assets/icons/avatars/06.svg';
import seven from '../assets/icons/avatars/07.svg';
import eight from '../assets/icons/avatars/08.svg';
import nine from '../assets/icons/avatars/09.svg';
import ten from '../assets/icons/avatars/10.svg';
import eleven from '../assets/icons/avatars/11.svg';
import twelve from '../assets/icons/avatars/12.svg';
import thirteen from '../assets/icons/avatars/13.svg';

type avatarType = {
  id: string;
  src: any;
  isSelected: boolean;
};

const AvatarFactory = () => {
  let avatars: avatarType[] = [];

  const add = (id: string, src: any) => {
    avatars = [...avatars, { id, src, isSelected: false }];
  };

  const find = (id: string) =>
    avatars.find((avatar: avatarType) => avatar.id === id);

  const setEveryIsSelectedFalse = () => {
    avatars = avatars.map((avatar: avatarType) => ({
      id: avatar.id,
      src: avatar.src,
      isSelected: false,
    }));
  };

  const setIsSelected = (id: string) => {
    setEveryIsSelectedFalse();

    const avatar = find(id);
    if (!avatar) return;
    avatar.isSelected = true;
  };

  return {
    get avatars() {
      return [...avatars];
    },
    setIsSelected,
    add,
    find,
  };
};

const avatarManager = AvatarFactory();
avatarManager.add('00', zero);
avatarManager.add('01', one);
avatarManager.add('02', two);
avatarManager.add('03', three);
avatarManager.add('04', four);
avatarManager.add('05', five);
avatarManager.add('06', six);
avatarManager.add('07', seven);
avatarManager.add('08', eight);
avatarManager.add('09', nine);
avatarManager.add('10', ten);
avatarManager.add('11', eleven);
avatarManager.add('12', twelve);
avatarManager.add('13', thirteen);

export default avatarManager;
