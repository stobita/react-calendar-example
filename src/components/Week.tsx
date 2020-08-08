import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { Day } from './Day';
import dayjs from 'dayjs';

type Props = {
  items: dayjs.Dayjs[];
};
export const Week = (props: Props) => {
  return (
    <Wrapper>
      {props.items.map((v, i) => (
        <Day key={i} day={v}></Day>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
