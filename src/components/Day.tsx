import React from 'react';
import styled, { css } from 'styled-components';
import { Container, Typography, Box } from '@material-ui/core';
import dayjs from 'dayjs';
// import isToday from 'dayjs/plugin/isToday'
import { DateContent } from './Calendar';

type Props = {
  item: DateContent;
};
export const Day = (props: Props) => {
  const isToday = () => {
    return dayjs().isSame(props.item.date, 'date');
  };
  return (
    <Wrapper>
      <Box
        color={isToday() ? 'white' : 'inherit'}
        bgcolor={isToday() ? 'primary.main' : 'inherit'}
      >
        <Typography>{props.item.date.date()}</Typography>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  height: 6rem;
`;
