import * as React from 'react';
import styled from 'styled-components';
import { Link } from '../Link/Link';

export interface ButtonProps {
    active?: boolean;
    onClick?: (arg: any) => void;
    className?: string;
    disabled?: boolean;
    href?: string;
    style?: object;
    title?: string;
    type?: string;
    tabIndex?: number;
    onKeyUp?: Function;
    hoverBackground?: string,
    hoverBorderColor?: string,
    disabledColor?: string,
    disabledBackground?: string,
};

var StyledButton = styled.button`
        margin: 0;
        padding: .7rem 1.6rem;
        border-radius: 4px;
        line-height: 1;
        cursor: pointer;
        background: linear-gradient(180deg,#fff,#f9fafb);
        color: #212b36;
        border: 1px solid #c4cdd5;
        &:hover,
        &:active,
        &:focus,
        &.active {
            background: ${props => props.style.hoverBackground} !important;
            border-color: ${props => props.style.hoverBorderColor} !important;
        };
        &.disabled {
            cursor: default !important;
            pointer-events: none !important;
            color: ${props => props.style.disabledColor} !important;
            background: ${props => props.style.disabledBackground} !important;
            border-color: ${props => props.style.disabledBackground} !important;
        };
`;

export class Button extends React.Component<ButtonProps> {
    public static defaultProps: Partial<ButtonProps> = {
        disabled: false,
        type: 'button',
        tabIndex: 1,
        hoverBackground: undefined,
        hoverBorderColor: undefined,
        disabledColor: undefined,
        disabledBackground: undefined,
        style: {
            hoverBackground: 'linear-gradient(180deg,#f9fafb,#f4f6f8)',
            hoverBorderColor: '#c4cdd5',
            disabledColor: '#919eab',
            disabledBackground: 'linear-gradient(180deg,#f4f6f8,#f4f6f8)',
        }
    };

    handleKeyUp = (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            this.props.onClick;
        };
    };

    render() {
        var buttonClasses = [
            this.props.className,
            this.props.active ? 'active' : null,
            this.props.disabled ? 'disabled' : null,
        ].join(' ').trim();
        
        if (this.props.type.toLowerCase() === 'link') {
            return <Link {...this.props} className={buttonClasses} />
        } else {
            return (
                <StyledButton
                    className={buttonClasses}
                    onClick={!this.props.disabled ? this.props.onClick : undefined}
                    tabIndex={this.props.tabIndex}
                    style={this.props.style}
                    onKeyUp={!this.props.disabled ? this.handleKeyUp : undefined}
                >
                    {this.props.title}
                    {this.props.children}
                </StyledButton>
            );
        };
    };
};
