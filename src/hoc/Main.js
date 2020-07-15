//react
import React, {Component} from "react";
//bootstrap
import {Container, Row, Col} from "react-bootstrap";
//helpers and registry
import * as registry from "../registry/registry";

const main = (WrappedComponent) =>
{
    class HOC extends Component
    {
        constructor(props)
        {
            super(props);
        }

        render()
        {
            let minHeight = "";


            switch (this.props.mode)
            {
                case registry.PAGINATION_HOC:
                    if (this.props.totalPages === 0)
                    {
                        return null;
                    }
                    break;
                case registry.PERSONS_HOC:
                    minHeight = this.props.persons.length === 0 ? "" : "persons-container";
                    break;
            }

            return (
                <Row className={`section ${minHeight}`}>
                    <Col xs={registry.MAIN_XSMALL}
                         sm={registry.MAIN_SMALL}
                         md={registry.MAIN_MEDIUM}
                         lg={registry.MAIN_LARGE}>
                        <WrappedComponent {...this.props}/>
                    </Col>
                </Row>
            );
        }
    }

    return HOC;
};

export default main;