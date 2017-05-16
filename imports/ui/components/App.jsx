import React, {Component} from "react";
import {PropTypes} from "prop-types";
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";

import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../../api/Tweets.js";

export class App extends Component {
    constructor(props) {
        super(props);

        this.projection = null;
        this.coor = [];

    }

    setProjection(projection) {
        this.projection = projection;
    }

    getProjection() {
        return this.projection;
    }

    getCoors() {
        if (this.props.tweets) {
            this.props.tweets.forEach(tweet => {
                if (tweet.coordinates.coordinates) {
                    this.coor.push(tweet.coordinates.coordinates)
                }

            })
        }

    }

    componentWillUpdate() {
        this.getCoors
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
        return (

            <div className="text-center">
                <h2> TWEETS IN COLOMBIA</h2>
                <div>
                    <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
                    { this.props && this.props.err ?
                        <div>Error: {this.props.err}</div> :
                        <span></span>
                    }
                </div>
                <div className="row">
                    <div className="text-center col-md-6">
                        <h3>Colombian Map</h3>
                    </div>
                    <div className="text-center col-md-6">
                        <h3>Tweets</h3>
                    </div>
                </div>
                <div className="row">

                    <div className="text-center col-md-6">
                        <ColombiaMap
                            setP={this.setProjection.bind(this)}
                            width="600"
                            height="500"
                            data={{RISARALDA: 0, CALDAS: 0}}
                        >
                        </ColombiaMap>

                        <Overlay tweets={this.props.tweets} getP={this.getProjection.bind(this)}/>
                    </div>
                    <div id="results" className="col-md-6">
                        {this.props && this.props.tweets ?
                            <TweetsResults tweets={this.props.tweets}/> :
                            <p>Enter a query</p>
                        }
                    </div>
                </div>

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