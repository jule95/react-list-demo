//react
import React from "react";
//bootstrap
import {Row, Col, Button} from "react-bootstrap";
/*my components*/
//hoc
import Main from "../../hoc/Main";

const pagination = props => {

    const pageNumbers = [];
    let pages;

    for(let i = 1; i <= props.totalPages; i++)
    {
        pageNumbers.push(i);
    }

    pages = pageNumbers.map(pageNumber => {

        const variant = pageNumber === props.currentPage ? "primary" : "secondary";

       return <Button
           key={pageNumber}
           variant={variant}
           className={"mr-1 ml-1 pg-button"}
           onClick={() => props.setPage(pageNumber)}>{pageNumber}</Button>
    });

    return (
        <Row>
            <Col className={"text-center"}>{pages}</Col>
        </Row>


    );

};

export default Main(pagination);