import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import Container from '@material-ui/core/Container';
import { Week } from './Week';
import styled from 'styled-components';

export const Calendar = () => {
    const current = dayjs().year(2020).month(8);
    const days = () => {
        const lastMonthDays = getLastMonthDays();
        const nextMonthDays = getNextMonthDays();
        const currentMonthDays = getCurrentMonthDays();

        const days = [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];
        const weeks = divisionWeek(days);
        console.log(weeks);
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
        const firstDayOfWeek = current.startOf('month').day();
        const lastMonthDays = current.subtract(1, 'month').daysInMonth();
        const top = lastMonthDays - firstDayOfWeek + 1;
        return Array<number>(lastMonthDays - top + 1)
            .fill(0)
            .map((v, i) => top + i);
    };
    const getNextMonthDays = () => {
        const lastDay = current.date(current.daysInMonth()).day();
        return Array<number>(7 - lastDay - 1)
            .fill(0)
            .map((v, i) => i + 1);
    };
    const getCurrentMonthDays = () => {
        return Array<number>(current.daysInMonth())
            .fill(0)
            .map((v, i) => i + 1);
    };
    return (
        <Container>
            {days().map((v, i) => (
                <Week items={v}></Week>
            ))}
        </Container>
    );
};
