//react
import React, {Component} from "react";
//bootstrap
import {Row, Col} from "react-bootstrap";
/*my components*/
//hoc
import Main from "../../hoc/Main";


class FilterPerson extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            filter: ""
        };
    }

    changeFilterHandler = () =>
    {
        const target = event.target;

        this.setState({
            filter: target.value
        }, () => this.props.filter(this.state.filter));
    };

    render()
    {
        return (
            <div className={"shadow"}>
                <Row className={"align-items-center pl-4 pr-4 pt-2 pb-2"}>
                    <Col sm={3}>
                        <span>Filter Persons:</span>
                    </Col>
                    <Col sm={9}>
                        <input className={"full-width"}
                               type="text"
                               placeholder={"Search by Name ..."}
                               value={this.state.filter}
                               onChange={this.changeFilterHandler}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Main(FilterPerson);