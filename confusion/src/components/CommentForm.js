import React,{Component} from 'react';
import {Button,Modal,ModalBody,ModalHeader,Row,Label} from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form';



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
      console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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

export default CommentForm;