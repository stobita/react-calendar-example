import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { CalendarContext } from './Calendar';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      padding: '16px',
    },
    item: {
      marginBottom: '8px',
    },
  }),
);

const defaultValues = {
  title: '',
  scheduledDate: new Date(),
};

type Schedule = {
  title: string;
  scheduledDate: Date;
};
export const ScheduleForm = () => {
  const { selectedDate } = useContext(CalendarContext);
  const { register, handleSubmit, setValue, control } = useForm<Schedule>({
    defaultValues,
  });
  const onSubmit = (data: Schedule) => {
    console.log(data);
  };
  useEffect(() => {
    setValue('scheduledDate', selectedDate);
  }, [selectedDate]);

  const classes = useStyles();
  return (
    <Box bgcolor="white" className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.item}>
          <TextField name="title" inputRef={register} placeholder="タイトル" />
        </div>
        <div className={classes.item}>
          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <Controller
              name="scheduledDate"
              control={control}
              render={(props) => <DatePicker {...props} />}
            ></Controller>
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.item}>
          <Button color="primary" variant="contained" type="submit">
            submit
          </Button>
        </div>
      </form>
    </Box>
  );
};
