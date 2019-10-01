import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodo, addTodo, deleteTodo, toggleCheckbox } from "../redux/actions/index";
import { Button, Card, CardText, CardBody, Form, FormGroup, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faTrashAlt} />

class Todo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         task: ""
      };
   }

   componentDidMount() {
      this.props.dispatch(getTodo())
   }

   onChangeTask = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   onSubmitTask = (e) => {
      e.preventDefault();
      const { task } = this.state
      if (task.trim().length > 0) {
         this.props.dispatch(addTodo(task))
         this.setState({
            task: ""
         });
      }
      else {
         alert('Input can\'t be empty')
      }
   };

   handleDelete = (id) => {
      this.props.dispatch(deleteTodo(id))
   }

   toggleCheckboxChange = (id) => {
      this.props.dispatch(toggleCheckbox(id))
   }

   render() {
      const { task } = this.state;
      const { taskList } = this.props;
      console.log('taskList', taskList)
      return (
         <div>
            <h1 style={{ textAlign: 'center' }}>Todo App</h1>
            <Form
               onSubmit={this.onSubmitTask}
               style={{ display: 'flex', justifyContent: 'center' }}>
               <FormGroup style={{ display: 'flex', width: '350px' }}>
                  <Input
                     type="text"
                     name="task"
                     value={task}
                     onChange={this.onChangeTask}
                  />
                  <Button color='primary' style={{ marginLeft: 5 }}>
                     <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
               </FormGroup>
            </Form>
            <div>
               <h3>Todo List</h3>
               <div>
                  {taskList && taskList.map(item => {
                     return (
                        <Card key={item._id}>
                           <CardBody style={{ display: 'flex' }}>
                              <label htmlFor="" style={{ display: 'flex' }}>
                                 <input
                                    type="checkbox"
                                    checked={item.isCompleted}
                                    onChange={() => this.toggleCheckboxChange(item._id)}
                                 />
                                 <CardText style={{ textDecoration: item.isCompleted ? 'line-through' : null }}>{item.task}</CardText>
                              </label>
                              <FontAwesomeIcon
                                 icon={faTrashAlt} style={{ marginLeft: 10, color: 'red' }}
                                 onClick={() => this.handleDelete(item._id)} />
                           </CardBody>
                        </Card>
                     )
                  })}
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   console.log("in todo", state);
   return {
      taskList: state.taskList
   }
};


export default connect(mapStateToProps)(Todo);
