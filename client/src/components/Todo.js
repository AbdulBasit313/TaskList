import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodo, addTodo, deleteTodo, toggleCheckbox, updateTodo } from "../redux/actions/index";
import { Button, Card, CardText, CardBody, Form, FormGroup, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import Loading from "./Loading";


class Todo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         task: "",
         id: null,
         isEditing: false
      };
   }

   componentDidMount() {
      this.props.dispatch(getTodo())
   }

   onChangeTask = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   };

   onSubmitTask = (e) => {
      e.preventDefault();
      const { task } = this.state
      const newTask = {
         task: this.state.task
      }
      if (task.trim().length > 0) {
         this.props.dispatch(addTodo(newTask))
         this.setState({ task: "", isEditing: false })
      }
      else {
         alert('Input can\'t be empty')
      }
   };

   handleDelete = (id) => {
      this.props.dispatch(deleteTodo(id))
   }

   handleUpdate = (e) => {
      e.preventDefault();
      console.log('this.state.id', this.state.id, 'this.state.task', this.state.task)
      const editTask = {
         task: this.state.task
      }
      this.setState({ isEditing: !this.state.isEditing, task: '' })
      this.props.dispatch(updateTodo(this.state.id, editTask))
   }

   getValues = (currTask, id) => {
      this.setState({
         task: currTask,
         isEditing: !this.state.isEditing,
         id: id
      })
   }

   toggleCheckboxChange = (id) => {
      this.props.dispatch(toggleCheckbox(id))
   }

   render() {
      const { task, isEditing } = this.state;
      const { taskList } = this.props;
      console.log('isEditing', isEditing)
      return (
         <div>
            <h1 style={{ textAlign: 'center' }}>Todo App</h1>
            <Form
               onSubmit={!isEditing ? this.onSubmitTask : this.handleUpdate}
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
                  {taskList.length ? taskList.map(({ _id, task, isCompleted }) => {
                     return (
                        <Card key={_id}>
                           <CardBody style={{ display: 'flex' }}>
                              <label htmlFor="" style={{ display: 'flex' }}>
                                 <input
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={this.toggleCheckboxChange.bind(this, _id)}
                                 />
                                 <CardText style={{ textDecoration: isCompleted ? 'line-through' : null }}>{task}</CardText>
                              </label>
                              <FontAwesomeIcon
                                 icon={faTrashAlt} style={{ marginLeft: 10, color: 'red' }}
                                 onClick={this.handleDelete.bind(this, _id)} />
                              <FontAwesomeIcon
                                 icon={faEdit} style={{ marginLeft: 10, color: 'red' }}
                                 onClick={this.getValues.bind(this, task, _id)} />
                           </CardBody>
                        </Card>
                     )
                  }) : <Loading />
                  }
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   // console.log("in todo", state);
   return {
      taskList: state.taskList
   }
};


export default connect(mapStateToProps)(Todo)