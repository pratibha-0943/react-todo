import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {PencilSquare,Trash3Fill } from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

export default function TodoList() {

  const arr = ['Exercise', 'walk', ' go to temple', 'study']

    const [inputText, setInputText] = useState('') //input field

    const [todoList, setTodoList] = useState(arr)
    const [openItem, setOpenItem] = useState('') //edit 


    function addTaskHandler (e){
     e.preventDefault();
     if(!inputText || inputText === ''){
      enqueueSnackbar('Enter task' )
     }
     else{
      setTodoList((prevState)=> [...prevState, inputText]);
      setInputText('')
     }
    
    }

    function editButtonHandler (i){
    setOpenItem(i)
    const updatedTodo= [...todoList]
    setInputText(updatedTodo[i])
    }

   function updateTaskHandler(e){
    e.preventDefault();
    const getupdateTodo = [...todoList]  //copy of array
    getupdateTodo[openItem]= inputText   //assign value 
    setTodoList(getupdateTodo);          //update state
    setInputText('')
    setOpenItem('')
   }


function deleteButtonHandler(i){
  const filteredTodoList = todoList.filter((item,index) => i!== index)
  console.log(filteredTodoList)
  setTodoList(filteredTodoList)

}


  return (

    <div className='mx-auto mt-5 mainContainer'>
    <SnackbarProvider />
        <InputGroup className="mb-3 input-field">
        <Form.Control
          placeholder="Add Task"   
          aria-label="Add  Task"
          aria-describedby="basic-addon2"
        value={inputText}
          onChange={e =>{setInputText(e.target.value)}}
        />
{openItem === ''?<Button variant="outline-secondary" id="button-addon2" onClick={(e)=>addTaskHandler(e)}>
         Add Task
        </Button>: <Button variant="outline-secondary" id="button-addon2" onClick={(e)=>updateTaskHandler(e)}>
         Update Task
        </Button>
        }

        
      </InputGroup>


<div className='table-container'>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>Task</th>
                    <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        

        {todoList.map((item, index)=>{
        
return  <tr key={index}>
          <td>{item}</td>
          <td>
          <div className='icon-container'>
          
                  <PencilSquare className='edit-icon' onClick={() =>editButtonHandler(index)} />
                  <Trash3Fill  onClick={()=>deleteButtonHandler(index)}/>
                </div>
          </td>
         
        </tr>
        })}
       
      </tbody>
    </Table>
</div>

      
    </div>
  )
}
