
import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { Media } from 'reactstrap';


class DishDetail extends Component{

    constructor(props){
        super(props);

        this.state = {

        };
    }

    renderDish(dish){

        if(dish != null){

            return(
                <div>
                    <Card>
                        <CardImg width="100%" object src = {dish.image} alt = {dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );

        }else{
            return(
                <div></div>
            );
        }
    }

    renderComments(comments){

        if(comments != null){

            const dishComments = comments.map((content) => {
                return(
                    <div key = {content.id}>
                        <Media tag="li">
                            <Media body>
                                <p>{content.comment}</p>
                                <p>-- {content.author}, {content.date}</p>
                            </Media>
                        </Media>
                    </div>
                )
            })

            return dishComments;

        }else{

            return(
                <div></div>
            );

        }
    }

    render(){

        if(this.props.selectedDish != null){

            return(
                <div className='row'>
                    <div className='col-md-5 col-sm-12 col-xs-12 m-1'>
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className='col-md-5 col-sm-12 col-xs-12 m-1'>
                        <h4>Comments</h4>
                        <div>
                            {this.renderComments(this.props.selectedDish.comments)}
                        </div>
                    </div>
                </div>
            );

        }else{

            return(
                <div></div>
            );

        }
    }
}

export default DishDetail;
