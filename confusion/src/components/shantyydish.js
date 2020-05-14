import React, { Component } from 'react';
import { Card , CardBody ,CardImg, CardImgOverlay,CardText, CardTitle , 
    Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,
     Row, Col,Form, FormGroup, Input, Label,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Media } from 'reactstrap';
//import {Link} from 'react-router-dom';    
import { Control, LocalForm, Errors,Field } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
         };
    
     this.toggleModal = this.toggleModal.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    
    }
    
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    
        render(){
      return(
          
         <div class="container">
          <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit</Button>
                    
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                       
                       
                        <Row className="form-group">
                        
                        <Col>
                           <Label htmlFor="rating">Rating</Label>
                                
                            <Control.select model=".contactType" name="contactType"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </Control.select>
                        </Col>
                       </Row>
                          
                       
                       <Row className="form-group">
                                <Label htmlFor="firstname" md={12}>Your Name</Label>
                                <Col >
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12} >
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                       rows="6"
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 0}}>
                                    <Button type="submit" color="primary">
                                     Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
          
          </ModalBody>
      </Modal>
         </div>    
      
        );
  }  

}


function RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card> 
            );
        
    }

    function RenderComments({comments}){
       if (comments){

        const display=comments.map((cmnts)=>{
           
            return(
                    <div  key={cmnts.id} >
                       <ul class="list-unstyled">
                        <p>{cmnts.comment}</p>
                        <p>--{cmnts.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnts.date)))} </p>
                       </ul>
                       
                    </div>);
                 });
            return (
                    <div>
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {display}
                        </ul>
                    </div>
                );          
           }
         
      else{
        return(
            <div/>
        );
      }  
    }
        
         
    
    const DishDetail = (props) => {
        console.log('DishDetail Component Render is invoked');

      if(props.dish)
        {return(
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                 </div>
                 <div className="col-12 col-md-5 m-1">
                 <RenderComments comments={props.comments}
                    />
                  <CommentForm dishId={props.dish.id} addComment={props.addComment} />
     
                 </div>
                </div>                                             
            </div>
            );
        }
        
        else
         {return(<div></div>);
         }   
       
     }


  
export default DishDetail; 


//{new Date(cmnts.date).toString().substr(0,10)} we can use this function also