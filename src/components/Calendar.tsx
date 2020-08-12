import React, { useState, createContext } from 'react';
import dayjs from 'dayjs';
import { Week } from './Week';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Modal,
  makeStyles,
  createStyles,
  Dialog,
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ScheduleForm } from './ScheduleForm';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

type CreateContextProps = {
  target: dayjs.Dayjs;
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (d: dayjs.Dayjs) => void;

  setFormOpen: (b: boolean) => void;
};

export const CalendarContext = createContext<CreateContextProps>({
  target: dayjs(),
  selectedDate: dayjs(),
  setSelectedDate: () => {},

  setFormOpen: () => {},
});

export type DateContent = {
  date: dayjs.Dayjs;
};

export const Calendar = () => {
  const [target, setTarget] = useState(dayjs());
  const [formOpen, setFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const handleOnClose = () => {
    setFormOpen(false);
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
          target,
          selectedDate,
          setSelectedDate,
          setFormOpen,
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
          <Week key={i} items={v}></Week>
        ))}
        <Dialog
          className={classes.modal}
          open={formOpen}
          onClose={handleOnClose}
        >
          <ScheduleForm></ScheduleForm>
        </Dialog>
      </CalendarContext.Provider>
    </>
  );
};
