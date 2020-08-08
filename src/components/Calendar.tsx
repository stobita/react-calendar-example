import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Container from '@material-ui/core/Container';
import { Week } from './Week';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styled from 'styled-components';

export const Calendar = () => {
  const [target, setTarget] = useState(dayjs());
  const days = () => {
    const lastMonthDays = getLastMonthDays();
    const nextMonthDays = getNextMonthDays();
    const currentMonthDays = getCurrentMonthDays();

    const days = [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];
    const weeks = divisionWeek(days);
    return weeks;
  };

  const divisionWeek = (items: number[]) => {
    const weekLength = 7;
    const length = Math.ceil(items.length / weekLength);
    return new Array(length)
      .fill(Array(weekLength))
      .map((_, i) => items.slice(i * weekLength, (i + 1) * weekLength));
  };

  const getLastMonthDays = () => {
    const firstDayOfWeek = target.startOf('month').day();
    const lastMonthDays = target.subtract(1, 'month').daysInMonth();
    const top = lastMonthDays - firstDayOfWeek + 1;
    return Array<number>(lastMonthDays - top + 1)
      .fill(0)
      .map((v, i) => top + i);
  };
  const getNextMonthDays = () => {
    const lastDay = target.date(target.daysInMonth()).day();
    return Array<number>(7 - lastDay - 1)
      .fill(0)
      .map((v, i) => i + 1);
  };
  const getCurrentMonthDays = () => {
    return Array<number>(target.daysInMonth())
      .fill(0)
      .map((v, i) => i + 1);
  };
  const nextMonth = () => {
    setTarget(target.add(1, 'month'));
  };
  const beforeMonth = () => {
    setTarget(target.subtract(1, 'month'));
  };
  return (
    <>
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
        <Week items={v}></Week>
      ))}
    </>
  );
};
