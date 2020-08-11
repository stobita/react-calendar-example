import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Box, TextField } from '@material-ui/core';

type Schedule = {
  title: string;
  date: Date;
};
export const ScheduleForm = () => {
  const { register, handleSubmit } = useForm<Schedule>();
  const onSubmit = (data: Schedule) => {
    console.log(data);
  };
  return (
    <Box bgcolor="white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField name="title" inputRef={register} />
      </form>
    </Box>
  );
};
