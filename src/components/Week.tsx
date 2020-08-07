import React from 'react';
import { Container } from '@material-ui/core';

type Props = {
    items: number[];
};
export const Week = (props: Props) => {
    return (
        <Container>
            {props.items.map((v, i) => (
                <div>{v}</div>
            ))}
        </Container>
    );
};
