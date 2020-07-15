//react
import React from "react";
//bootstrap
import {Row, Col, Spinner} from "react-bootstrap";
/*components*/
//function based
import Person from "./Person/Person";
//hoc
import Main from "../../hoc/Main";

const persons = props =>
{
    //prepare loading icon to be rendered if data is fetching
    const loading =
        <Row className={"pl-4"}>
            <Col>
                <div className="fa-3x">
                    <i className="fas fa-spinner fa-spin"/>
                </div>
            </Col>
        </Row>;

    //prepare message to inform user of empty result
    const noData =
        <Row className={"pl-4"}>
            <Col>
                No entries found!
            </Col>
        </Row>;

    //only display persons on current pagination section
    const lastPerson = props.personsPerPage * props.currentPage;
    const firstPerson = lastPerson - props.personsPerPage;

    let persons = props.persons.slice(firstPerson, lastPerson);

    if (persons.length !== 0)
    {
        persons = persons.map(person =>
        {
            const data = {
                name: person.name,
                age: person.age
            };

            const details = [
                {id: 0, desc: "Date of Birth", val: person.dob},
                {id: 1, desc: "E-Mail", val: person.email},
                {id: 2, desc: "Phone", val: person.phone}
            ];

            return <Person
                key={person.id}
                data={data}
                details={details}
                isUiDisabled={props.isUiDisabled}
                isPersonToggled={person.isPersonToggled}
                edit={() => props.edit(person.id)}
                remove={() => props.remove(person.id)}
                toggle={() => props.toggle(person.id)}/>
        });
    } else
    {
        persons = noData;
    }

    return props.isDataFetching ? loading : persons;
};

export default Main(persons);
