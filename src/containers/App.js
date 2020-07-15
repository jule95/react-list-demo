//react
import React, {Component} from "react";
//bootstrap components
import {Container} from "react-bootstrap";
/*my components*/
//class based
import AddPerson from "../components/Form/AddPerson/AddPerson";
import EditPerson from "../components/Form/EditPerson/EditPerson";
import FilterPerson from "../containers/Form/FilterPerson";
//function based
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import Pagination from "../components/Pagination/Pagination.js";
//helpers and registry
import * as http from "../helpers/http";
import * as array from "../helpers/array";
import * as birthday from "../helpers/birthday";
import * as string from "../helpers/string";
import * as pagination from "../helpers/pagination";

import * as registry from "../registry/registry";


class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            persons: [],
            isDataFetching: true, //determines whether Persons.js is displaying a loading animation
            isUiDisabled: true, //determines whether action buttons are disabled
            isUserEditing: false, //determines whether EditPerson.js is showing
            personToEdit: null,
            currentPage: 1,
            personsPerPage: 4
        };
    }

    /*lifecycle*/
    componentDidMount() //OK
    {
        http.getTime().then(timeData =>
        {
            const now = timeData.unixtime;

            http.get().then(data =>
            {
                this.setState({
                    persons: array.sort(birthday.updateAge(data), now),
                    isDataFetching: false,
                    isUiDisabled: false
                });
            })
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const prevPersons = prevState.persons;
        const persons = this.state.persons;
        const personsPerPage = this.state.personsPerPage;

        const prevTotalPages = pagination.getTotalPages(undefined, prevPersons, personsPerPage);
        const totalPages = pagination.getTotalPages(undefined, persons, personsPerPage);

        //checks if delete action will cause site to show fewer pagination numbers
        if ((prevTotalPages > totalPages) && (prevTotalPages === this.state.currentPage))
        {
            this.setState({
                //automatically jump back one pagination site
                currentPage: --prevState.currentPage
            })
        }
    }

    /*helpers*/
    editPerson = id =>
    {
        this.setState({
            isUserEditing: true,
            personToEdit: this.state.persons.find(person => person.id === id)
        });
    };

    toggleUi = toggle =>
    {
        this.setState({
            isUiDisabled: toggle
        });
    };

    /*handlers*/
    //create
    addPersonHandler = person =>
    {
        this.toggleUi(true);

        const persons = [...this.state.persons];

        http.getTime().then(timeData =>
        {
            person.creation = timeData.unixtime;

            http.create(person).then(personData =>
            {
                personData.age = birthday.getAge(person.dob);

                this.setState({
                    currentPage: 1,
                    persons: array.add(persons, personData),
                    isUiDisabled: false
                });
            });
        });

    };

    //update
    updatePersonHandler = person =>
    {
        this.toggleUi(true);

        //preserve value which determines display of details
        const isPersonToggled = person.isPersonToggled;

        //remove value so as not to post it to database
        delete person.isPersonToggled;
        delete person.age;

        const persons = [...this.state.persons];

        http.update(person.id, person).then(() =>
        {
            //add value so as not to interfere with current state
            person.isPersonToggled = isPersonToggled;
            person.age = birthday.getAge(person.dob);

            this.setState({
                persons: array.update(persons, person),
                isUserEditing: false,
                isUiDisabled: false
            })
        });
    };

    //delete
    removePersonHandler = id =>
    {
        this.toggleUi(true);

        const persons = [...this.state.persons];

        http.remove(id).then(() =>
        {
            this.setState({
                persons: array.remove(persons, id),
                isUiDisabled: false
            });
        });
    };

    closeModalHandler = () =>
    {
        this.setState({
            isUserEditing: false
        })
    };

    togglePersonHandler = id =>
    {
        const persons = [...this.state.persons];

        persons.forEach((person, index) =>
        {
            if (person.id === id)
            {
                persons[index].isPersonToggled = !persons[index].isPersonToggled;
            }
        });

        this.setState({
            persons
        });
    };

    filterPersonHandler = (filter) =>
    {
        const persons = [...this.state.persons];

        if (!string.isEmpty(filter))
        {
            this.setState({
                isUiDisabled: true,
                personsToDisplay: array.filter(persons, filter),
                currentPage: 1,
            })
        } else
        {
            this.setState({
                isUiDisabled: false,
                personsToDisplay: undefined,
                currentPage: 1,
            })
        }
    };

    setPageHandler = (page) =>
    {
        this.setState({
            currentPage: page
        })
    };

    render()
    {
        return (

            <Container>

                {/*wrapped in Main.js HOC*/}
                <Cockpit title={this.props.title}/>

                {/*wrapped in Main.js HOC*/}
                <FilterPerson
                    //handlers
                    filter={this.filterPersonHandler}
                    toggle={this.toggleUi}/>

                {/*wrapped in Main.js HOC*/}
                <Persons
                    //primitives and objects
                    isUiDisabled={this.state.isUiDisabled}
                    isDataFetching={this.state.isDataFetching}
                    personsPerPage={this.state.personsPerPage}
                    currentPage={this.state.currentPage}
                    persons={this.state.personsToDisplay || this.state.persons}
                    mode={registry.PERSONS_HOC}
                    //handlers
                    edit={this.editPerson}
                    remove={this.removePersonHandler}
                    toggle={this.togglePersonHandler}/>

                {/*wrapped in Main.js HOC*/}
                <Pagination
                    //primitives and objects
                    totalPages={pagination.getTotalPages(
                        this.state.personsToDisplay,
                        this.state.persons,
                        this.state.personsPerPage)}
                    currentPage={this.state.currentPage}
                    mode={registry.PAGINATION_HOC}
                    //handlers
                    setPage={this.setPageHandler}/>

                {/*wrapped in Main.js HOC*/}
                <AddPerson
                    //primitives and objects
                    isUiDisabled={this.state.isUiDisabled}
                    mode={registry.ADD_MODE}
                    label={"Add Person"}
                    //handlers
                    action={this.addPersonHandler}/>

                <EditPerson
                    //primitives and objects
                    mode={registry.EDIT_MODE}
                    label={"Edit Person"}
                    isUiDisabled={this.state.isUiDisabled}
                    isUserEditing={this.state.isUserEditing}
                    personToEdit={this.state.personToEdit}
                    //handlers
                    action={this.updatePersonHandler}
                    close={this.closeModalHandler}/>

            </Container>
        );
    }
}

export default App;