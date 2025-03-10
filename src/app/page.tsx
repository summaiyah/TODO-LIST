"use client"

import { ModeToggle } from "@/components/ModeToggle";
import { useState } from "react"

export default function Home (){
// define state 
type Todo = {
  task: string;
  id: number;
};

const [todos, setTodos] = useState<Todo[]>([
  { task: "laundry", id: 1 },
]);

const [inputVal, setInput] = useState<string>("");
const [id, setId] = useState<number>(0);

  //functions

  const addItem = () => {
    const obj: Todo | undefined = todos.find((item) => item.id === id);

    if (obj) {
      const newArray: Todo[] = todos.filter((item) => item.id !== obj.id);
      setTodos([...newArray, { task: inputVal, id }]);
    } else {
      setTodos([...todos, { task: inputVal, id }]);
    }

    setInput("");
    setId(0);
  };

  const editItem = (id: number) => {
    const obj: Todo | undefined = todos.find(item => item.id === id);
    if (obj) {
      setInput(obj.task);
      setId(obj.id);
    }
  };
  

  const deleteItem = (id: number) => {
    const newArray: Todo[] = todos.filter(item => item.id !== id);
    setTodos(newArray);
  };
  
  
  return(
    <div><ModeToggle/>
    <div className="max-w-4xl  mx-auto p-5">
      <h1 className="text-center text-[45px] font-mono"> TO-DO LIST</h1>

      {/* start input div  */}
      <div className="flex justify-between gap-10">
        <input 
        type="text"
       value= {inputVal}
       onChange={(e) => setInput(e.target.value)}
        className="w-[80%] p-3 rounded-l-md  rounded-r-md border-b  border-r focus:outline-none"
        placeholder="Write Task"
          />
          <input
          type="number"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
           className="w-[15%] p-3 rounded-l-md  rounded-r-md border-b  border-r focus:outline-none" placeholder=" Type ID"/>
        { <button 
        onClick={addItem}
        className=" w-[05%] bg-black text-white text-[20px] p-2 border-none rounded-md hover:bg-gray-700  dark:bg-white dark:text-black">+</button>}
      </div>
      {/* end input div  */}
      <div className="grid grid-cols-1 mt-5  ">
        {/* grid items */}
        {
         todos.map((item: Todo, i: number) => {
            return(
              
              <div className="shadow p-3 w-[90%] "key={i}>
          <div className="flex justify-between">
          <span className="shadow rounded-full h-5 w-5">{i+1}</span>
          <span 
          onClick={()=>deleteItem(item.id)}
          className="shadow rounded-full h-5 w-5 cursor-pointer hover:bg-red-700 text-center hover:text-white">X</span>
          </div>
          {/* data div  */}
        <div className="mt-5 text-[30px]">{item.task}</div>
        <div>
          <h2 onClick={()=>editItem(item.id)} className="text-right cursor-pointer hover:text-green-500">Edit</h2>
        </div>
        </div>
            )
          })
        }
        
        </div>
      </div>
    </div>
    
  )
}

