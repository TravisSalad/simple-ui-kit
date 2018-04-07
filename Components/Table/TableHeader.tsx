import * as React from 'react';
import styled from 'styled-components';
import {TableColumnProps} from "./Table";
import {TableRow} from './TableRow';
import {TableHeaderColumn} from './TableHeaderColumn';

export interface TableHeaderProps {
    children?: React.ReactChild|React.ReactChild[];
    className?: string;
    columns: TableColumnProps[];
    style?: object;
    rowStyle?: object;
};

var StyledTableHeader = styled.thead``;

function renderTableColumns(props: TableHeaderProps): React.ReactNode[] {
    return props.columns.map((column, i) => {
        return (
            <TableHeaderColumn
                style={props.rowStyle}
                key={`${i}-${column.title}`}
                column={column}
            />
        );
    });
};

export function TableHeader(props: TableHeaderProps) {
    return (
        <StyledTableHeader
            style={props.style}
            className="simple-table__header"
        >
            <TableRow>
                {props.children || renderTableColumns(props)}
            </TableRow>
        </StyledTableHeader>
    );
};
