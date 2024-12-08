// import { useEffect, useState } from 'react'
// import Nevbar from './components/Nevbar'
// import { v4 as uuidv4 } from 'uuid';


// function App() {

//   const [todo, setTodo] = useState("")
//   const [Todos, setTodos] = useState([])

//   useEffect( () => {
//     let todoString = localStorage.getItem("Todos")
//     if(todoString){
//       let todos = JSON.parse(localStorage.getItem("Todos"))

//       setTodos(todos);
//     }
//   }), []

//   const saveToLS = () => {
//     localStorage.setItem("Todos", JSON.stringify(Todos))
//   }

//   const handleEdit = (e, id) => {
//     let t = Todos.filter(i=>i.id === id)
//     setTodo(t[0].todo)

//     let newTodos = Todos.filter(item=>{
//       return item.id!==id
//     });
//     setTodos(newTodos)
//     saveToLS();
//   }

//   const handleDelete = (e,id) => {
//     let newTodos = Todos.filter(item=>{
//       return item.id!==id
//     });
//     setTodos(newTodos)
//     saveToLS();
//   }

//   const handleAdd = () => {
//     setTodos([...Todos, {id: uuidv4(), todo, isCompleted: false }])
//     setTodo("")
//     saveToLS();
//   }

//   const handleChange = (e) => {
//     setTodo(e.target.value)

//   }

//   const handleCheckbox = (e) => {
//     let id = e.target.name;
//     let index = Todos.findIndex(item=>{
//       return item.id ===id;
//     })
//     let newTodos = [...Todos];
//     newTodos[index].isCompleted = !newTodos[index].isCompleted;
//     setTodos(newTodos)
//     saveToLS();
//   }
//   return (
//     <>
//       <Nevbar />
//       <div className="container mx-auto rounded-xl p-3 mt-5 bg-violet-50 min-h-[80vh]">
//         <div className="addTodo my-5">
//           <h2 className='text-lg font-bold'>Add a Todo</h2>
//           <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
//           <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Save</button>
//         </div>

//         <h2 className='text-lg font-bold'>Your Todos</h2>
//         <div className="todos">
//           {Todos.length===0 && <div className='m-5'>No Todod to display</div>}
//           {Todos.map(item => (
//             <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
//               <div className='flex gap-5'>
//               <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id='' />
//               <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
//               </div>
//               <div className="buttons flex h-full">
//                 <button onClick={(e) => handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'>Edit</button>
//                 <button onClick={(e) => handleDelete(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default App


import { useEffect, useState } from 'react';
import Nevbar from './components/Nevbar';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [Todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    // Wrap the useEffect code in a function to use async/await
    const fetchData = async () => {
      let todoString = localStorage.getItem('Todos');
      if (todoString) {
        let todos = JSON.parse(todoString);
        setTodos(todos);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array, indicating it should only run on mount

  const saveToLS = () => {
    localStorage.setItem('Todos', JSON.stringify(Todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  }

  const handleEdit = (e, id) => {
    let t = Todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = Todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = Todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Nevbar />
      <div className="mx-5 md:container md:mx-auto rounded-xl p-3 mt-5 bg-violet-200 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>iTask -Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-5 py-1"/>
          <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-600 p-4 py-2 text-sm font-bold text-white rounded-full mx-2"
          >
            Save
          </button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />   <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-black opacity-15 w-[90%]  my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {Todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {Todos.map(item => {
            
           return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className="flex gap-5">
                <input onChange={handleCheckbox} type="checkbox"
                  checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2">
                <FaEdit />
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
