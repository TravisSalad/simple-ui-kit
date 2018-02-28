import * as React from "react";
import {modalControllerShape} from "./Modal";

export interface ComponentFactory<Props> {
    (Component: React.ComponentClass<Props>): React.ComponentClass<Props>;
}

export function withModal<Props = any>(
    Component: React.ComponentClass<Props>,
): React.ComponentClass<Props> {
    return class extends React.Component<Props> {

        static contextTypes = {
            modal: modalControllerShape,
        };

        componentWillUnmount() {
            this.context.modal.hide();
        }

        render() {
            var {children, ...props} = this.props as any;

            return (
                <Component
                    {...props}
                    modal={this.context.modal}>
                    {children}
                </Component>
            );
        }

    };

}