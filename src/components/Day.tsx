import React from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import dayjs from 'dayjs';
import { DateContent } from './Calendar';

type Props = {
  item: DateContent;
  onClick: () => void;
};
export const Day = (props: Props) => {
  const isToday = () => {
    return dayjs().isSame(props.item.date, 'date');
  };
  return (
    <>
      <Wrapper onClick={props.onClick}>
        <Box
          color={isToday() ? 'white' : 'inherit'}
          bgcolor={isToday() ? 'primary.main' : 'inherit'}
        >
          <Typography>{props.item.date.date()}</Typography>
        </Box>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  flex: 1;
  height: 6rem;
`;
