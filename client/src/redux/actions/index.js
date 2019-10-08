import axios from 'axios'

export const getTodo = () => (dispatch) => {
   let url = "http://localhost:5000/api/tasks/";
   dispatch(setTodoLoading())
   axios
      .get(url)
      .then((res) => {
         dispatch({
            type: "GET_TODO",
            payload: res.data
         })
      })
      .catch((err) => {
         console.log(err);
      });
};

export const addTodo = (task) => (dispatch) => {
   let url = "http://localhost:5000/api/tasks/";
   axios
      .post(url, task)
      .then(res => {
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
            payload: res.data
         })
      })
      .catch((err) => {
         console.log(err);
      })
};

export const updateTodo = (id, task) => (dispatch) => {
   console.log('task in update', task)
   let url = "http://localhost:5000/api/tasks/"
   axios
      .put(url + id, task)
      .then((res) => {
         dispatch({
            type: "UPDATE_TODO",
            payload: res.data
         })
         console.log('updated', res.data)
      })
      .catch((err) => {
         console.log(err);
      })
};

export const toggleCheckbox = (data) => ({
   type: "TOGGLE_TODO",
   payload: data
});

export const setTodoLoading = () => {
   return {
      type: 'SET_LOADING'
   }
}
