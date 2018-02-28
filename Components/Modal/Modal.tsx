import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";

export const modalControllerShape = PropTypes.shape({
    show: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
});

export interface ModalRender {
    (hideModal: Function): JSX.Element;
}

export interface ModalProps {
    hideOnClickAway?: boolean;
}

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

export class Modal extends React.Component<ModalProps> {

    static childContextTypes = {
        modal: modalControllerShape,
    };

    renderModalContents: ModalRender;

    state = {
        isShowingModal: false,
    };

    constructor(props, context) {
        super(props, context);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    };

    getChildContext() {
        return {
            modal: {
                show: this.showModal,
                hide: this.hideModal,
            },
        };
    };

    showModal(renderContents: ModalRender) {
        this.renderModalContents = renderContents;
        window.addEventListener('keyup', this.handleKeyUp);
        this.setState({ isShowingModal: true });
    };

    hideModal() {
        window.removeEventListener('keyup', this.handleKeyUp);
        this.setState({ isShowingModal: false });
    };

    renderModal() {
        if (!this.state.isShowingModal) return;

        return (
            <div
                onClick={this.props.hideOnClickAway ? this.hideModal : undefined}
                className="Modal"
            >
                <div
                    className="Modal-Box"
                    onClick={(e) => e.stopPropagation()}
                >
                    <CloseIcon onClick={this.hideModal} />
                    {this.renderModalContents(this.hideModal)}
                </div>
            </div>
        );
    };

    handleKeyUp(e) {
        console.log("fired key up: ", e)
        //escape
        if (e.keyCode === 27) this.hideModal();
    }

    render() {
        return (
            <div>
                {this.renderModal()}
                {this.props.children}
            </div>
        );
    };
};
