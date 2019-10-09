import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodo, addTodo, deleteTodo, toggleCheckbox, updateTodo } from "../redux/actions/index";
import { Button, Card, CardText, CardBody, Form, FormGroup, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import Loading from "./Loading";
import Swal from 'sweetalert2'
import { CSSTransition, TransitionGroup } from "react-transition-group";


class Todo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         task: "",
         id: null,
         isEditing: false,
         isCompleted: false
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
      Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
         if (result.value) {
            this.props.dispatch(deleteTodo(id))
            Swal.fire(
               'Deleted!',
               'Your file has been deleted.',
               'success'
            )
         }
      })
   }

   handleUpdate = (e) => {
      e.preventDefault();
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

   toggleCheckboxChange = (id, isCompleted) => {
      console.log('clicked')
      const toggleTodo = {
         isCompleted: !isCompleted
      }
      this.props.dispatch(toggleCheckbox(id, toggleTodo))
   }

   render() {
      const { task, isEditing } = this.state;
      const { taskList } = this.props;
      // console.log('isEditing', isEditing)
      return (
         <div className='app'>
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
                        <Card key={_id} style={{ marginBottom: 10 }}>
                           <CardBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              <div>
                                 <div className="round">
                                    <label className="checkbox">
                                       <input
                                          style={{ borderRadius: '50%' }}
                                          // className='checkbox-shape'
                                          type="checkbox"
                                          id="checkbox"
                                          checked={isCompleted}
                                          onChange={this.toggleCheckboxChange.bind(this, _id, isCompleted)}
                                       />
                                    </label>
                                 </div>
                                 <CardText className={isCompleted ? 'checkbox' : null} style={{ marginLeft: 15, marginBottom: 15 }}>{task}</CardText>
                              </div>
                              <div>
                                 <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    style={{ marginLeft: 10, color: 'tomato', fontSize: 15, cursor: 'pointer' }}
                                    onClick={this.handleDelete.bind(this, _id)} />
                                 <FontAwesomeIcon
                                    icon={faEdit}
                                    style={{ marginLeft: 10, color: '#ccc', fontSize: 15, cursor: 'pointer' }}
                                    onClick={this.getValues.bind(this, task, _id)} />
                              </div>
                           </CardBody>
                        </Card>
                     )
                  }) : <Loading />
                  }
               </div>
            </div>
         </div >
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