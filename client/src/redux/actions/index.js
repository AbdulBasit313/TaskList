import axios from 'axios'

export const getTodo = () => (dispatch) => {
   console.log('action called')
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
      .catch((error) => {
         console.log(error);
      });
};

export const addTodo = (data) => ({
   type: "ADD_TODO",
   payload: data
});

export const deleteTodo = (data) => ({
   type: "DELETE_TODO",
   payload: data
});

export const editTodo = (data) => ({
   type: "DELETE_TODO",
   payload: data
});

export const toggleCheckbox = (data) => ({
   type: "TOGGLE_TODO",
   payload: data
});
