import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import dayjs from 'dayjs';
import { DateContent, CalendarContext } from './Calendar';

type Props = {
  item: DateContent;
};
export const Day = (props: Props) => {
  const isToday = () => {
    return dayjs().isSame(props.item.date, 'date');
  };
  const { setSelectedDate, setFormOpen } = useContext(CalendarContext);
  const handleOnClick = () => {
    setSelectedDate(props.item.date);
    setFormOpen(true);
  };
  return (
    <>
      <Wrapper onClick={handleOnClick}>
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
