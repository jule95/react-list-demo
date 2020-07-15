//react
import React from "react";
import ReactDOM from "react-dom";

/*my components*/
//class based
import App from "./containers/App";

/*other libraries and packages*/
//fontawesome
import "@fortawesome/fontawesome-free/js/all";
//jquery
import $ from "jquery";
window.$ = $;
//styles
import "../styles/main.css";

ReactDOM.render(<App title="Persons Demo"/>, document.getElementById('root'));