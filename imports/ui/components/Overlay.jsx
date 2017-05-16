/**
 * Created by Juan on 16/05/2017.
 */
import React, {Component} from "react";

export default class Overlay extends Component{

    constructor(props) {
        super(props);

        this.canvas =null;

    }

    componentDidMount(){
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, 600, 500);
        ctx.fillStyle = 'red';

        this.props.tweets.map((tweet)=>{
            var coord = this.props.getP()(tweet.coordinates.coordinates);
            ctx.beginPath();
            ctx.arc(coord[0], coord[1], this.props.value, 0, Math.PI * 2, true);
            ctx.fill();
        })
    }

    componentWillUpdate(nextProps){
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, 600, 500);
        ctx.fillStyle = 'red';

        this.props.tweets.map((tweet)=>{
            var coord = this.props.getP()(tweet.coordinates.coordinates);
            ctx.beginPath();
            ctx.arc(coord[0], coord[1], this.props.value, 0, Math.PI * 2, true);
            ctx.fill();
        })
    }


    render(){
        return (
            <canvas width="600" height="500" ref = {(canvas) => (this.canvas = canvas)}></canvas>
        )
    }
}