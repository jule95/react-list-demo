//react
import React from "react";
//bootstrap
import {Row, Col, Button} from "react-bootstrap";
/*my components*/
//class based
import FormPerson from "../../../containers/Form/FormPerson";
//hoc
import Modal from "../../../hoc/Modal";

const editPerson = props =>
{
    return (
        <FormPerson {...props}>
            <Col className={"mb-xs-2"} xs={12} sm={6}>
                <Button
                    className={"full-width uppercase"}
                    type={"submit"}
                    variant={"primary"}
                    disabled={props.isUiDisabled}>{props.label}</Button>
            </Col>
            <Col xs={12} sm={6}>
                <Button
                    className={"full-width uppercase"}
                    variant={"secondary"}
                    disabled={props.isUiDisabled}
                    onClick={props.close}>Cancel</Button>
            </Col>
        </FormPerson>
    )
};

export default Modal(editPerson);