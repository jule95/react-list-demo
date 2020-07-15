//react
import React, {Component} from "react";
//bootstrap
import {Row, Col, Modal} from "react-bootstrap";
//helpers and registry
import * as registry from "../registry/registry";

const modal = (WrappedComponent) =>
{
    class HOC extends Component
    {
        constructor(props)
        {
            super(props);
        }

        render()
        {
            return (
                <Modal show={this.props.isUserEditing}>
                    <WrappedComponent {...this.props}/>
                </Modal>
            );
        }
    }

    return HOC;
};

export default modal;