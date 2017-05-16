/**
 * Created by Juan on 16/05/2017.
 */
import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

export class Overlay extends Component{

    constructor(props) {
        super(props);

       this.canvas =null;
       this.projection =null;
       this.state={
           tweets : {}
       }

    }
    draw(tweets) {
        this.setState({tweets:this.props.tweets});
        this.projection = this.props.getP;
        if (this.canvas.getContext) {
            var ctx = this.canvas.getContext('2d');
            tweets.map((tweet)=>{
                if(tweets.coordinates.coordinates) {
                    var x = this.projection(tweets.coordinates.coordinates)[1];
                    ctx.arc(40, 40, Math.PI * 2);
                }
            }

        }
    }

    componentWillUpdate(nextProps){

        draw.bind(this);
    }


    render(){
        return (
            <canvas ref = {(canvas) => (this.canvas = canvas)}></canvas>
        )
    }
}