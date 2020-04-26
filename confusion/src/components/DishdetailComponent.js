import React from 'react';
import {Card,CardImg,CardImgOverlay
  ,CardText,CardBody,CardTitle, ListGroup, ListGroupItem,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

  function RenderDish({dish,comment}){
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
                < RenderComments dishcomment={comment}/>
                </div>
                </div>
             );}
      else {
        return(
          <div></div>
        );}
   }

   function RenderComments({dishcomment}){
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

          </div>
        );
     }


  const DishDetail= (props)=>{
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
        <RenderDish dish={props.dish} comment={props.comments}/>
        </div>
      </div>
    );
  }

export default DishDetail;
