import uuid from 'uuid/v4'


let initState = {
   taskList: [],
};

const todoReducer = (state = initState, action) => {
   switch (action.type) {
      case "GET_TODO":
         return { taskList: action.payload }

      case "ADD_TODO":
         console.log('add todo reducer')
         return {
            ...state,
            taskList: [{ todo: action.payload, id: uuid(), completed: false }, ...state.taskList]
         }
      case 'DELETE_TODO':
         return {
            ...state,
            taskList: state.taskList.filter(item => item.id !== action.payload)
         }
      case 'TOGGLE_TODO':
         return {
            ...state,
            taskList: state.taskList.map(item => {
               if (item.id !== action.payload) return item
               return { ...item, completed: !item.completed }
            })
         }

      default:
         return state;
   }
};


export default todoReducer;
