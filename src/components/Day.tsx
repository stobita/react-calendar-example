import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import dayjs from 'dayjs';

type Props = {
  day: dayjs.Dayjs;
};
export const Day = (props: Props) => {
  return (
    <Wrapper>
      <Container>{props.day.date()}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  height: 6rem;
`;
