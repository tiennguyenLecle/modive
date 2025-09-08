import { useRef } from 'react';

import CharacterCard from '../CharacterCard';
import ModalCharacter from '../modals/ModalCharacter';
import { useWork } from '../WorkProvider';

export default function TabCharacter() {
  const { workDetail } = useWork();

  const modalCharacterRef =
    useRef<React.ElementRef<typeof ModalCharacter>>(null);

  return (
    <>
      <CharacterCard.List
        characters={workDetail?.characters || []}
        itemProps={{
          onClick: character => {
            modalCharacterRef.current?.open(character);
          },
        }}
      />
      <ModalCharacter ref={modalCharacterRef} />
    </>
  );
}
