import React, { useEffect, useState, createContext } from 'react';
import dayjs from 'dayjs';
import Container from '@material-ui/core/Container';
import { Week } from './Week';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Modal,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styled from 'styled-components';
import { ScheduleForm } from './ScheduleForm';

type CreateContextProps = {
  target: dayjs.Dayjs;
};

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

export const CalendarContext = createContext<CreateContextProps>({
  target: dayjs(),
});

export type DateContent = {
  date: dayjs.Dayjs;
};

export const Calendar = () => {
  const [target, setTarget] = useState(dayjs());
  const [formOpen, setFormOpen] = useState(false);
  const handleOnClose = () => {
    setFormOpen(false);
  };
  const handleOnOpen = () => {
    setFormOpen(true);
  };
  const days = () => {
    const lastMonthDays = getLastMonthDays();
    const nextMonthDays = getNextMonthDays();
    const currentMonthDays = getCurrentMonthDays();

    const days = [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];
    const weeks = divisionWeek(days);
    return weeks;
  };

  const divisionWeek = (items: DateContent[]) => {
    const weekLength = 7;
    const length = Math.ceil(items.length / weekLength);
    return new Array(length)
      .fill(Array(weekLength))
      .map((_, i) => items.slice(i * weekLength, (i + 1) * weekLength));
  };

  const getLastMonthDays = (): DateContent[] => {
    const firstDayOfWeek = target.startOf('month').day();
    const lastMonth = target.subtract(1, 'month');
    const lastMonthDays = lastMonth.daysInMonth();
    const top = lastMonthDays - firstDayOfWeek + 1;
    return Array<number>(lastMonthDays - top + 1)
      .fill(0)
      .map((_, i) => {
        return {
          date: dayjs()
            .month(lastMonth.month())
            .date(top + i),
        };
      });
  };
  const getNextMonthDays = (): DateContent[] => {
    const lastDay = target.date(target.daysInMonth()).day();
    return Array<number>(7 - lastDay - 1)
      .fill(0)
      .map((_, i) => {
        return {
          date: dayjs()
            .month(target.month() + 1)
            .date(i + 1),
        };
      });
  };
  const getCurrentMonthDays = (): DateContent[] => {
    return Array<number>(target.daysInMonth())
      .fill(0)
      .map((_, i) => {
        return {
          date: target.date(i + 1),
        };
      });
  };
  const nextMonth = () => {
    setTarget(target.add(1, 'month'));
  };
  const beforeMonth = () => {
    setTarget(target.subtract(1, 'month'));
  };
  const classes = useStyles();
  return (
    <>
      <CalendarContext.Provider
        value={{
          target: target,
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography>Calender</Typography>
            <IconButton color="inherit" onClick={beforeMonth}>
              <NavigateBeforeIcon></NavigateBeforeIcon>
            </IconButton>
            <IconButton color="inherit" onClick={nextMonth}>
              <NavigateNextIcon></NavigateNextIcon>
            </IconButton>
            <Typography>
              {target.year()}/{target.month() + 1}
            </Typography>
          </Toolbar>
        </AppBar>
        {days().map((v, i) => (
          <Week items={v} onClickDate={handleOnOpen}></Week>
        ))}
        <Modal
          className={classes.modal}
          open={formOpen}
          onClose={handleOnClose}
        >
          <ScheduleForm></ScheduleForm>
        </Modal>
      </CalendarContext.Provider>
    </>
  );
};
