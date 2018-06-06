import * as React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

export interface ModalProps {
    handleClose: () => void;
    show: boolean;
    modalContent: any;
    style?: object;
    title?: string;
    titleClass?: string;
    titleStyle?: object;
}

//styles container of modal (background).
var ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    position: fixed;
    top: 0;
    overflow: hidden;
`;

//styles content section of modal (foreground).
var ContentContainer = styled.div`
    max-width: 768px;
    max-height: 95vh;
    overflow: auto;
    background-color: #fff;
    z-index: 10001;
    border-radius: .2rem;
    padding: 1rem;
    `;

//Wraps the header of the content section.  Contains StyledTitle and CloseIcon.    
var HeaderWrapper = styled.div`
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
`;

var StyledTitle = styled.label`
    font-size: 24px;
    font-weight: bold;
`;

//X icon that calls handleClose from props
var CloseIcon = styled.div`
    position: relative;
    display: flex;
    margin-left: auto;
    width: 20px;
    height: 20px;
    cursor: pointer;
    &:hover {
        &::before, &::after {
            background: gray;
        };
    };
    &::before, &::after {
        content: '';
        position: absolute;
        height: 2px;
        width: 100%;
        top: 50%;
        left: 0;
        margin-top: -1px;
        background: #000;
        height: 4px;
        margin-top: -2px;
        border-radius: 5px;
    };
    &::before {
        transform: rotate(45deg);
    };
    &::after {
        transform: rotate(-45deg);
    };
`;


function handleContentClick(e) {
    //content section clicked, prevent modal from closing.
    e.stopPropagation();
};

function handleKeyUp(e, props: ModalProps) {
    //escape pressed, close modal.
    if (e.keyCode === 27) props.handleClose();
}

function closeIconKeyUp(e, cb) {
    //close (X) icon key up, if enter/space, call handleClose.
    if (e.keyCode === 13 || e.keyCode === 32) {
        cb();
    };
};

function createHeader(props: ModalProps) {
    return (
        <HeaderWrapper>
            {props.title && 
                <StyledTitle
                    tabIndex={1}
                    className={props.titleClass}
                    style={props.titleStyle}
                >
                    {props.title}
                </StyledTitle>
            }
            <CloseIcon
                onKeyUp={(e) => closeIconKeyUp(e, props.handleClose)}
                tabIndex={1}
                onClick={props.handleClose}
            />
        </HeaderWrapper>
    );
};

export class Modal extends React.Component<ModalProps> {
    
    private modal;

    public componentDidMount(): void {
        //create div and apply directly to body of document.
        this.modal = document.createElement('div');
        document.body.appendChild(this.modal);
    };
    
    public componentWillUnmount(): void {
        //remove modal from body of document.
        ReactDOM.unmountComponentAtNode(this.modal);
        document.body.removeChild(this.modal);
        //remove event listener.
        window.removeEventListener('keyup', (e) => handleKeyUp(e, this.props));
    };

    public componentWillReceiveProps(props: ModalProps): void {
        if (props.show) {
            //add keyup event listener if modal is being shown.
            window.addEventListener('keyup', (e) => handleKeyUp(e, props));
        } else {
            //remove keyup event listener if modal is being hidden.
            window.removeEventListener('keyup', (e) => handleKeyUp(e, props));
        }
        //add modal to div that was applied to document body.
        ReactDOM.render(
            <ModalWrapper
                style={{display: props.show ? 'flex' : 'none'}}
                onClick={props.handleClose}
            >
                <ContentContainer
                    onClick={handleContentClick}
                    style={props.style}
                >
                    {createHeader(props)}
                    {props.modalContent}
                </ContentContainer>
            </ModalWrapper>,
            this.modal
        );
    };

    public render() {
        return null;
    };
};
