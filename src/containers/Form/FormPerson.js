//react
import React, {Component} from "react";
//bootstrap
import {Row} from "react-bootstrap";
/*my components*/
//function based
import Input from "../../components/Input/Input";
//helpers & registry
import * as validation from "../../helpers/validation";

import * as registry from "../../registry/registry";


class FormPerson extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            name: {value: "", error: ""},
            dob: {value: "", error: ""},
            email: {value: "", error: ""},
            phone: {value: "", error: ""},
            inputs: [
                {id: 0, description: "name", placeholder: "Name", type: "text"},
                {id: 2, description: "dob", placeholder: "Date of Birth (DD.MM.YYYY)", type: "text"},
                {id: 3, description: "email", placeholder: "E-Mail", type: "text"},
                {id: 4, description: "phone", placeholder: "Mobile Phone", type: "text"}
            ]
        }
    }

    componentDidMount()
    {
        //initialize fields for edit form with values
        if (this.props.mode === registry.EDIT_MODE)
        {
            const personToEdit = {...this.props.personToEdit};

            const values = {...this.state};

            delete values.inputs;

            for (let value in values)
            {
                values[value].value = personToEdit[value];
                values[value].error = "";
            }

            this.setState({values});
        }
    }

    changePersonHandler = () =>
    {
        const target = event.target;
        const values = {...this.state};

        values[target.id].value = target.value;

        this.setState(values);
    };

    blurPersonHandler = () =>
    {
        const values = {...this.state};

        //check for target id (either name or age)
        switch (event.target.id)
        {
            case "name":
                const isNameValid = validation.validateName(values.name.value);
                values.name.error = isNameValid ? "" : registry.NAME_ERROR;
                break;
            case "dob":
                const isDobValid = validation.validateDob(values.dob.value);
                values.dob.error = isDobValid ? "" : registry.DOB_ERROR;
                break;
            case "email":
                const isEmailValid = validation.validateEmail(values.email.value);
                values.email.error = isEmailValid ? "" : registry.EMAIL_ERROR;
                break;
            case "phone":
                const isPhoneValid = validation.validatePhone(values.phone.value);
                values.phone.error = isPhoneValid ? "" : registry.PHONE_ERROR;
        }

        this.setState(values);
    };

    submit = () =>
    {
        event.preventDefault();

        const isNameValid = validation.validateName(this.state.name.value);
        const isDobValid = validation.validateDob(this.state.dob.value);
        const isEmailValid = validation.validateEmail(this.state.email.value);
        const isPhoneValid = validation.validatePhone(this.state.phone.value);

        if (isNameValid && isDobValid && isEmailValid && isPhoneValid)
        {
            switch (this.props.mode)
            {
                case registry.ADD_MODE:

                    const person = {
                        name: this.state.name.value,
                        dob: this.state.dob.value,
                        email: this.state.email.value,
                        phone: this.state.phone.value
                    };

                    this.props.action(person);

                    const values = {...this.state};

                    delete values.inputs;

                    for (let val in values)
                    {
                        values[val].value = "";
                        values[val].error = "";
                    }
                    break;
                case registry.EDIT_MODE:
                    const personToEdit = {...this.props.personToEdit};

                    personToEdit.name = this.state.name.value;
                    personToEdit.dob = this.state.dob.value;
                    personToEdit.email = this.state.email.value;
                    personToEdit.phone = this.state.phone.value;

                    this.props.action(personToEdit);
                    break;
            }
        } else
        {
            const errors = {
                name: [isNameValid, registry.NAME_ERROR],
                dob: [isDobValid, registry.DOB_ERROR],
                email: [isEmailValid, registry.EMAIL_ERROR],
                phone: [isPhoneValid, registry.PHONE_ERROR]
            };

            const values = {...this.state};

            for (let error in errors)
            {
                values[error].value = this.state[error].value;
                values[error].error = errors[error][0] ? "" : errors[error][1];
            }

            this.setState({values});
        }
    };


    render()
    {
        const inputs = this.state.inputs.map((input) =>
        {
            return <Input
                //primitives and objects
                key={input.id}
                id={input.description}
                value={this.state[input.description].value}
                error={this.state[input.description].error}
                placeholder={input.placeholder}
                type={input.type}
                //handlers
                change={this.changePersonHandler}
                blur={this.blurPersonHandler}/>
        });

        return (
            <div className={"shadow"}>
                <div className={"form-header pl-4 pr-4 pt-2 pb-2"}>
                    {this.props.label}
                </div>

                <form onSubmit={this.submit} className={"pl-4 pr-4 pb-4 pt-2"}>
                    {inputs}
                    <Row>
                        {this.props.children}
                    </Row>
                </form>
            </div>
        );
    }
}

export default FormPerson;