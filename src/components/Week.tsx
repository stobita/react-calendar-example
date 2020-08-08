import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { Day } from './Day';

type Props = {
    items: number[];
};
export const Week = (props: Props) => {
    return (
        <Wrapper>
            {props.items.map((v, i) => (
                <Day day={v}></Day>
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
`;
