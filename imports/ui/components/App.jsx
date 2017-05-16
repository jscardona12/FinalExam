import React, {Component} from "react";
import {PropTypes} from "prop-types";
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import ColombiaMap from "./ColombiaMap";
import Overlay from "./Overlay";

import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";

export class App extends Component {
    constructor(props) {
        super(props);

        this.projection = null;

    }

    setProjection(projection) {
        this.projection = projection;
    }

    getProjection() {
        return this.projection;
    }

    changeQuery(evt) {
        if (evt.key !== "Enter") {
            return;
        }
        // "this" will change in the method call, so I need to save it
        let component = this;

        console.log(evt.target.value);
        Meteor.call("twitter.stream", evt.target.value);

    }


    render() {
        console.log("render!");
        return (
            <div>
                <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
                { this.props && this.props.err ?
                    <div>Error: {this.props.err}</div> :
                    <span></span>
                }
                <ColombiaMap setP={this.setProjection.bind(this)} width="400" height="400"/>
                {this.props && this.props.tweets ?
                    <Overlay tweets={this.props.tweets} getP={this.getProjection().bind(this)}/>
                }
                <h2>Results:</h2>
                {this.props && this.props.tweets ?
                    <TweetsResults tweets={this.props.tweets}/> :
                    <p>Enter a query</p>
                }


            </div>
        );
    }
}

App.propTypes = {
    tweets: PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
    Meteor.subscribe("tweets");


    return {
        tweets: Tweets.find({}).fetch()
    };
}, App);