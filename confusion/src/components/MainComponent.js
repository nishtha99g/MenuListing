import React,{Component} from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent.js'
import {DISHES} from '../shared/dishes';
class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      selectedDish:null
    };
  }

  onDishSelect(xyz){
     this.setState({
       selectedDish:xyz
     });
    }

  render(){
  return (
    <div>
     <Navbar dark color="primary">
       <div className="container">
         <NavbarBrand href="/">Confusion here </NavbarBrand>
       </div>
     </Navbar>
     <Menu dishes={this.state.dishes}
     onClick={(xyz)=>this.onDishSelect(xyz)}/>
     <DishDetail  dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}/>
    </div>
  );
}
}

export default Main;
