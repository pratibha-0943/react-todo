import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {PencilSquare,Trash3Fill, Check2Circle } from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import CustomDropdown from './CustomDropdown';

export default function AdvanceTodo() {

  const tasklist = [
    {
        task_name: "A",
        assignTo: 'manager',
        status: 'not started',
        editable: false
    },
    {
        task_name: "B",
        assignTo: 'developer',
        status: 'in progress',
        editable: false
    },
    {
        task_name: "C",
        assignTo: 'client',
        status: 'done',
        editable: false
    },
    {
        task_name: "D",
        assignTo: 'tester',
        status: 'in progress',
        editable: false
    },
   
  ]

  const assignedToOptions = [
    {label:'Manager',value:'manager'},
    {label:'Developer',value:'developer'},
    {label:'Tester',value:'tester'},
    {label:'Client',value:'client'},

  
]
  
  const statusOptions = [
    {label:'Not Started',value:'not started'},
    {label:'In Progress',value:'in progress'},
    {label:'Done',value:'done'},
  ]
 
    const [inputText, setInputText] = useState('') //input field
    const [todoList, setTodoList] = useState(tasklist)


    function addTaskHandler (e){
     e.preventDefault();
     
     setTodoList([...todoList,    {
      task_name: inputText,
      assignTo: '',
      status: '',
      editable: true
  },]);

setInputText('')
    }

    function editButtonHandler (i){
    const updatedTodo= [...todoList]
    updatedTodo[i].editable = true;
    setTodoList(updatedTodo)
    // console.log(updatedTodo[i])
    
    }

   function updateTaskHandler(index){
    const updatedTodo= [...todoList]
    updatedTodo[index].editable = false;
    setTodoList(updatedTodo)
   }

   function onSelectChange (e,index){
e.preventDefault();
const getSelectedItem = [...todoList] //copy of array
getSelectedItem[index][e.target.name] = e.target.value
setTodoList(getSelectedItem);

   }


function deleteButtonHandler(i){
  const filteredTodoList = todoList.filter((item,index) => i!== index)
//   console.log(filteredTodoList)
  setTodoList(filteredTodoList)

}


  return (

    <div className='mx-auto mt-5 mainContainer'>
    <h1>Advance Todo</h1>
    <SnackbarProvider />
        <InputGroup className="mb-3 input-field">
        <Form.Control
          placeholder="Add Task"   
          aria-label="Add  Task"
          aria-describedby="basic-addon2"
        value={inputText}
          onChange={e =>{setInputText(e.target.value)}}
        />
<Button variant="outline-secondary" id="button-addon2" onClick={(e)=>addTaskHandler(e)}>
         Add Task
        </Button>

        
      </InputGroup>


<div className='table-container'>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>Task</th>
          <th>Assign To</th>
          <th>Status</th>
                    <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        

        {todoList.map((item, index)=>{
       
return  <tr key={index}>
          <td>{item.task_name}</td>
          <td> {item.editable ? <CustomDropdown AllOptions={assignedToOptions} name={'assignTo'} selectedValue= {item.assignTo} onchange={onSelectChange} itemIndex={index} />: <p>{item.assignTo}</p>} </td>
          <td>{item.editable? <CustomDropdown AllOptions= {statusOptions} name={'status'} selectedValue= {item.status}  onchange={onSelectChange} itemIndex={index} />: <p>{item.status}</p> }</td>
          <td>
          <div className='icon-container'>
          {item.editable === true ? <Check2Circle className='update-icon'onClick={()=>updateTaskHandler(index)} /> :<PencilSquare className='edit-icon' onClick={() =>editButtonHandler(index)} />}
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
