//react
import React from "react";
/*my components*/
//hoc
import Main from "../../hoc/Main";

const cockpit = props => {
    return(
        <h2 className={"cockpit-title"}>{props.title}</h2>
    );
};

export default Main(cockpit);