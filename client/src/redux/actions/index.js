import axios from 'axios'

export const getTodo = () => (dispatch) => {
   let url = "http://localhost:5000/api/tasks/";
   axios
      .get(url)
      .then((res) => {
         dispatch({
            type: "GET_TODO",
            payload: res.data
         })
         console.log('data', res.data)
      })
      .catch((err) => {
         console.log(err);
      });
};

export const addTodo = (task) => (dispatch) => {
   console.log('action called')
   let url = "http://localhost:5000/api/tasks/";
   axios
      .post(url, task)
      .then((res) => {
         dispatch({
            type: 'ADD_TODO',
            payload: res.data
         })
      })
      .catch((err) => {
         console.log(err);
      })
};

export const deleteTodo = (id) => (dispatch) => {
   let url = "http://localhost:5000/api/tasks/"
   axios
      .delete(url + id)
      .then((res) => {
         dispatch({
            type: "DELETE_TODO",
            payload: id
         })
      })
      .catch((err) => {
         console.log(err);
      })
};

export const editTodo = (data) => ({
   type: "DELETE_TODO",
   payload: data
});

export const toggleCheckbox = (data) => ({
   type: "TOGGLE_TODO",
   payload: data
});
