//react
import React from "react";
//bootstrap components
import {Row, Col} from "react-bootstrap";

const input = props =>
{
    return (
        <Row className={"mb-3"}>
            <Col xs={12} md={10}>
                <input className={"full-width"}
                       id={props.id}
                       value={props.value}
                       placeholder={props.placeholder}
                       onChange={props.change}
                       onBlur={props.blur}
                       type={props.type}/>
            </Col>

            <Col xs={12} md={10}>
                <span className={"text-danger"}>{props.error}</span>
            </Col>
        </Row>
    )
};

export default input;