import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';
import { useString } from '../../context/StringContext';
import firebase from '../../utils/firebase';
import Button from '../Button';
import Loading from '../Loading';

const KnotCreateWrapper = styled.div`
  form {
    display: flex;
    height: 5rem;
    justify-content: flex-end;
    align-items: center;

    textarea {
      background: ${(props: any) => props.theme.base.three};
      margin-right: 4em;
      border: 0;
      color: ${(props: any) => props.theme.text.three};
      border-radius: 5px;
      border: 0px solid ${(props: any) => props.theme.aurora.four};
      border-left-width: 0.7em;
      padding: 0.3em;
      font-size: 1.1em;
      height: 5em;
      &:focus {
        outline: 2px solid ${(props: any) => props.theme.text.four};
      }
    }
  }
`;

const FormFiller = styled.div`
  flex-grow: 1;
  padding: 0.1em;
  background: ${(props: any) => props.theme.aurora.four};

  @media (max-width: 680px) {
    display: none;
  }
`;

const KnotCreate: FC = function KnotCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [knot, setKnot] = useState('');
  const string = useString() || { id: 'DEFAULT' };

  const onKnotInput = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setKnot(event.target.value);

  const onKnotSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setKnot('');
    await firebase.createKnot({ stringId: string.id, content: knot });
    setIsSubmitting(false);
  };

  return (
    <KnotCreateWrapper>
      <form onSubmit={onKnotSubmit}>
        <FormFiller />
        <textarea
          value={knot}
          name="knot-input"
          id="knot-input"
          cols={15}
          rows={5}
          onChange={onKnotInput}
          maxLength={1500}
          required
        />
        {isSubmitting ? (
          <Loading width="30px" />
        ) : (
          <Button
            type="submit"
            status="secondary"
            textContent="Create knot"
            padding="0.5em"
            clickHandler={() => {}}
          />
        )}
      </form>
    </KnotCreateWrapper>
  );
};

export default KnotCreate;
