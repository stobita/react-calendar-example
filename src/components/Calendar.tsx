import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import Container from '@material-ui/core/Container';

export const Calendar = () => {
    const month = 8;
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
        const length = Math.ceil(items.length / 7);
        return new Array(length)
            .fill(Array(7))
            .map((_, i) => items.slice(i * 7, (i + 1) * 7));
    };

    const getLastMonthDays = () => {
        const first = dayjs()
            .subtract(dayjs().date() - 1, 'day')
            .day();
        const lastMonthDays = dayjs().subtract(1, 'month').daysInMonth();
        const top = lastMonthDays - first + 1;

        return Array<number>(lastMonthDays - top + 1)
            .fill(0)
            .map((v, i) => top + i);
    };
    const getNextMonthDays = () => {
        const lastDay = dayjs().date(dayjs().daysInMonth()).day();

        return Array<number>(7 - lastDay - 1)
            .fill(0)
            .map((v, i) => i + 1);
    };
    const getCurrentMonthDays = () => {
        return Array<number>(dayjs().daysInMonth())
            .fill(0)
            .map((v, i) => i + 1);
    };
    return (
        <Container>
            {days().map((v, i) => (
                <div key={i}>{v}</div>
            ))}
        </Container>
    );
};
