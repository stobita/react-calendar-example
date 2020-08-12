import React from 'react';
import styled from 'styled-components';
import { Day } from './Day';
import { DateContent } from './Calendar';

type Props = {
  items: DateContent[];
};

export const Week = (props: Props) => {
  return (
    <Wrapper>
      {props.items.map((v, i) => (
        <Day key={i} item={v}></Day>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
