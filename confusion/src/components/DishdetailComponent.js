import React,{Component} from 'react';
import {Card,CardImg
  ,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,Row,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading } from './LoadingComponent';
import {Control,LocalForm,Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxlength = (len) => (val) => !(val) || (val.length <= len);
const minlength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

  constructor(props){
      super(props);
      this.state={
          isModelOpen:false
      }
      this.toggleModel=this.toggleModel.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this); 
  }

  toggleModel(){
      this.setState({
        isModelOpen:!this.state.isModelOpen
      });
  }      
  
  handleSubmit(values){
    this.toggleModel();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render(){
      return(
         <div>
            <Button outline onClick={this.toggleModel}>
                      <span className="fa fa-pencil fa=lg"></span> Submit Comment
            </Button>
           <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModel}>
           <ModalHeader toggle={this.toggleModel}>Submit Comment</ModalHeader>
           <ModalBody>
             <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
               <Row className="form-group" className="m-1">
                 <Label htmlfor="rating" >Rating</Label>
                  <Control.select model=".rating" name="rating"
                  className="form-control" >
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                  </Control.select>
                </Row>
                <Row className="form-group" className="m-1">
                 <Label htmlfor="author" >Your Name</Label>
                  <Control.text  model=".author"  id="author" name="author"
                   placeholder="Enter your name" 
                   className="form-control"
                   validators={{
                      required,minlength:minlength(3),maxlength:maxlength(15)
                  }}/>
                  <Errors className="text-danger" model=".author" show="touched"
                  messages={{
                  required:'Required',
                  minlength:'Must be greater than 2 charachters',
                  maxlength:'Must be less than 15 charachters'
                  }} />
                </Row>
                <Row className="form-group" className="m-1">
                 <Label htmlfor="comment">Comment</Label>
                 <Control.textarea model=".comment" id="comment" name="comment" className="form-control" />
                </Row>
                <Button type="submit" value="submit" color="primary" className="m-1" >Submit </Button>
             </LocalForm>
           </ModalBody>
        </Modal>
         </div>
      );
  }
}

  function RenderDish({dish,comment,addComment,dishId}){
      if(dish!=null){
             return(
               <div class="row">
               <div className="col-12 col-md-5 m-1">
                   <Card>
                     <CardImg width="100%" src={dish.image} alt={dish.name} />
                     <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                     </CardBody>
                   </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                < RenderComments dishcomment={comment} addComment={addComment} dishId={dishId}/>
                
                </div>
                </div>
             );}
      else {
        return(
          <div></div>
        );}
   }

   function RenderComments({dishcomment,addComment,dishId}){
     const display = dishcomment.map((mycom) => {
     return (

    <div>
       <li key={mycom.id}>{mycom.comment}
       <p> -- {mycom.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(mycom.date)))}
       </p></li>
      </div>
    
    );
     });
     return(
          <div>
             <h4>Comments</h4>
             <ul className="list-unstyled">{display}</ul>
             <CommentForm dishId={dishId} addComment={addComment}/>
          </div>
        );
     }


  const DishDetail= (props)=>{
    if(props.isLoading){
      return (
          <div className="container">
            <div className="row">
              <Loading />
            </div>
          </div>
      );
    }
    else if(props.errMess){
      return (
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
    );
    }
    else if(props.dish!=null){
    return(
      <div className="container">
      <div className="row">
       <Breadcrumb>
        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
       </Breadcrumb>
       <div className="col-12">
       <h3>{props.dish.name}</h3>
       <hr />
       </div>
     </div>
     <div className="row">
        <RenderDish dish={props.dish} comment={props.comments} addComment={props.addComment} 
        dishId={props.dish.id}/>
        </div>
      </div>
    );
    }
  }

export default DishDetail;
