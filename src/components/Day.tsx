import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  Container,
  Typography,
  Box,
  Modal,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import dayjs from 'dayjs';
// import isToday from 'dayjs/plugin/isToday'
import { DateContent } from './Calendar';
import { ScheduleForm } from './ScheduleForm';

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
