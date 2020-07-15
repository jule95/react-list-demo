//react
import React from "react";
//bootstrap
import {Col, Button} from "react-bootstrap";
/*my components*/
//class based
import FormPerson from "../../../containers/Form/FormPerson";
//hocs
import Main from "../../../hoc/Main";

const addPerson = props =>
{
    return (
        <FormPerson {...props}>
            <Col>
                <Button
                    className={"full-width uppercase"}
                    type={"submit"}
                    variant={"primary"}
                    disabled={props.isUiDisabled}>{props.label}</Button>
            </Col>
        </FormPerson>
    )
};

export default Main(addPerson);