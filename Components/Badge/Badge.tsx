import * as React from 'react';
import styled from 'styled-components';

export interface BadgeProps {
    value: string | number;
}

var StyledBadgeWrapper = styled.div`
    position: relative;
    display: inline-flex;
    padding: 24px 24px 12px 12px;
`

var StyledBadge = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    padding: 5px;
    border-radius: 5em;
`

export class Badge extends React.Component<BadgeProps, undefined> {
    render() {
        return (
            <StyledBadgeWrapper className="simple-badge__wrapper">
                <StyledBadge className="simple-badge__content">{this.props.value}</StyledBadge>
                {this.props.children}
            </StyledBadgeWrapper>
        )
    }
}