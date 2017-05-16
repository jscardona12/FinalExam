/**
 * Created by Juan on 16/05/2017.
 */
import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

export default class Overlay extends Component{

    constructor(props) {
        super(props);

        this.canvas =null;
        this.projection =null;
        this.state={
            tweets : {}
        }

    }
    draw() {
        console.log("render!");
        this.projection = this.props.getP();
        if (this.canvas.getContext) {
            let ctx = this.canvas.getContext('2d');
            ctx.fillStyle = 'red';
            console.log(this.props.coors);
            this.props.coors.forEach((coor)=>{
                    var coord = this.props.getP()(coor);
                    ctx.arc(coord[0], coord[1], 2, 0, Math.PI * 2, true);
                    ctx.fill();
            })

        }
    }

    componentDidMount(){
        console.log("hola1!")
        console.log(this.props.tweets)
    }
    componentWillUpdate(nextProps){
        console.log("hola!")
        console.log(this.props.tweets);
        this.props.tweets.map((tweet)=>{
            let ctx = this.canvas.getContext('2d');
            ctx.fillStyle = 'red';
            var coord = this.props.getP()(tweet.coordinates.coordinates);
            ctx.beginPath();
            ctx.arc(coord[0], coord[1], 2, 0, Math.PI * 2, true);
            ctx.fill();
        })
    }


    render(){
        return (
            <canvas width="600" height="500" ref = {(canvas) => (this.canvas = canvas)}></canvas>
        )
    }
}