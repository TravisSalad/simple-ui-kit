
import * as React from 'react';
import styled from 'styled-components';
import {Button} from '../Button/Button';

export interface PaginatorProps {
    currentPage: number;
    numberOfPages: number;
    updatePage: (val: number) => void;
    showNextButton?: boolean;
    jumpToEnd?: boolean;
    style?: object;
    buttonStyle?: object;
    buttonClass?: string;
    className?: string;
};

var StyledPaginatorWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export class Paginator extends React.Component<PaginatorProps> {

    public static defaultProps = {
        currentPage: 1,
        showNextButton: true,
        jumpToEnd: true,
    };

    createButton = (button, disabled, active, pageReference) => {
        return (
            <Button
                active={active}
                key={`page-${button}`}
                className={this.props.buttonClass}
                disabled={disabled}
                style={{ 
                    ...this.props.buttonStyle,
                    marginLeft: '.5em',
                    marginRight: '.5em'
                }}
                type="link"
                handleClick={() => this.props.updatePage(pageReference)}
            >
                {button}
            </Button>
        );
    };

    numberedPages = (numPages, currentPage, updatePage) => {
        var numbers = [];
        //create button for each page.
        for (var i = 0; i < numPages; i++) {
            var pageNumber = i + 1;
            var button = this.createButton(pageNumber.toString(), false, currentPage === pageNumber, pageNumber)
            numbers.push(button);
        };
        if (numPages <= 5) {
            return numbers;
        } else {
            var start = currentPage - 3 >= 0 ? currentPage - 3 : 0;
            var end = currentPage + 2 <= numPages ? currentPage + 2 : numPages;
            return numbers.slice(start, end);
        };
    };

    render() {
        var { currentPage, numberOfPages, updatePage, showNextButton, jumpToEnd, className } = this.props;
        var numPages = Math.ceil(numberOfPages);

        if (!numPages || numPages <= 1) return null;

        return (
            <StyledPaginatorWrapper className={className} style={this.props.style}>
                {jumpToEnd && numPages ? this.createButton('Start', currentPage === 1, false, 1) : null}
                {showNextButton && numPages ? this.createButton('Prev', currentPage === 1, false, currentPage - 1) : null}
                {numPages > 5 && currentPage > 3 ? <span><span>{this.createButton('1', false, false, 1)}</span><span>...</span></span> : null}
                {this.numberedPages(numPages, currentPage, updatePage)}
                {numPages > 5 && currentPage + 3 < numPages ? <span><span>...</span><span>{this.createButton(numPages.toString(), false, false, numPages)}</span></span> : null}
                {showNextButton && numPages ? this.createButton('Next', currentPage === numPages, false, currentPage + 1) : null}
                {jumpToEnd && numPages ? this.createButton('End', currentPage === numPages, false, numPages) : null}
            </StyledPaginatorWrapper>
        );
    };
};
