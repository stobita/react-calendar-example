import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

type Props = {
    day: number;
};
export const Day = (props: Props) => {
    return (
        <Wrapper>
            <Container>{props.day}</Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    flex: 1;
    height: 6rem;
`;
