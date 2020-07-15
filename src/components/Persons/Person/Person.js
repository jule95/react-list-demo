//react
import React from "react";
//import PropTypes from "prop-types";
//bootstrap components
import {Container, Row, Col, Button} from "react-bootstrap";

const person = props =>
{
    const data = props.details.map((item, index) =>
    {
        const padding = index < props.details.length - 1 ? "pb-1" : "pb-3";

        return <Row key={item.id} className={`pl-2 ${padding}`}>
            <Col xs={12} md={3}><span className={"bold"}>{item.desc}</span></Col>
            <Col xs={12} md={9}><span>{item.val}</span></Col>
        </Row>;
    });


    const details = props.isPersonToggled ?
        <React.Fragment>
            <Row className={"pl-2 pb-2"}>
                <Col className={"uppercase"}>Details</Col>
            </Row>
            {data}
        </React.Fragment>
        : null;

    return (
        <Container className={"shadow mb-2"}>
            <Row className={"align-items-center p-2"}>
                <Col xs={4} sm={6} className={"mb-xs-2"}>
                    <span onClick={props.toggle}
                          className={"pointer"}>{props.data.name}, Age: {props.data.age}</span>
                </Col>

                <Col xs={4} sm={3} className={"pr-xs-1"}>
                    <Button disabled={props.isUiDisabled} variant={"light"}
                            className={"text-warning uppercase full-width pl-xs-1 pr-xs-1"}
                            onClick={props.edit}>
                        Edit
                    </Button>
                </Col>

                <Col xs={4} sm={3} className={"pl-xs-1 pr-xs-1"}>
                    <Button disabled={props.isUiDisabled} variant={"light"}
                            className={"text-danger uppercase full-width pl-xs-1 pr-xs-1"}
                            onClick={props.remove}>
                        Delete
                    </Button>
                </Col>
            </Row>

            {details}

        </Container>
    )
};

/*
person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number
};
*/

export default person;


