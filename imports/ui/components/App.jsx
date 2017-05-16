import React, {Component} from "react";
import {PropTypes} from "prop-types";
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";

import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../../api/Tweets.js";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            value: 2,
            min: 0,
            max: 5,
        }
        this.projection = null;
        this.coor = [];

    }

    onSliderChange(value) {
        this.setState({value: value});
    }

    setProjection(projection) {
        this.projection = projection;
    }

    getProjection() {
        return this.projection;
    }


    changeQuery(evt) {
        // "this" will change in the method call, so I need to save it
        this.setState({show: true});
        console.log(this.state.show);
        let component = this;

        Meteor.call("twitter.stream", " ");

    }


    render() {
        if (this.state.show) {


            return (

                <div className="text-center">
                    <h2> TWEETS IN COLOMBIA</h2>
                    <div>
                        <button className="btn btn-sm btn-primary" onClick={this.changeQuery.bind(this)}>
                            Watch the tweets of colombia
                        </button>
                        <h4>Choose the granularity of the dots</h4>

                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <Slider defaultValue={2} min={this.state.min} max={this.state.max}
                                    onChange={this.onSliderChange.bind(this)}
                            />
                        </div>
                        <div className="col-md-4"></div>
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

                            <Overlay value={this.state.value} tweets={this.props.tweets}
                                     getP={this.getProjection.bind(this)}/>

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
        else {
            return (
                <div className="text-center">
                    <h2> TWEETS IN COLOMBIA</h2>
                    <div>
                        <button className="btn btn-sm btn-primary" onClick={this.changeQuery.bind(this)}>
                            Watch the tweets of colombia
                        </button>
                    </div>

                </div>

            );
        }

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