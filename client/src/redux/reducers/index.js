let initState = {
   taskList: [],
   loading: false
};

const todoReducer = (state = initState, action) => {
   switch (action.type) {
      case "GET_TODO":
         return { taskList: action.payload, loading: false }

      case "ADD_TODO":
         return {
            ...state,
            taskList: [action.payload, ...state.taskList]
         }
      case 'DELETE_TODO':
         return {
            ...state,
            taskList: state.taskList.filter(item => item._id !== action.payload._id)
         }
      case 'UPDATE_TODO':
         console.log('action.payload', action.payload)
         return {
            ...state,
            taskList: state.taskList.map(item => {
               if (item._id !== action.payload._id) return item
               return { ...item, ...action.payload }
            })
         }
      case 'TOGGLE_TODO':
         return {
            ...state,
            taskList: state.taskList.map(item => {
               if (item._id !== action.payload._id) return item
               return { ...item, isCompleted: !item.isCompleted }
            })
         }
      case 'SET_LOADING':
         return {
            ...state,
            loading: true
         }

      default:
         return state;
   }
};


export default todoReducer;
