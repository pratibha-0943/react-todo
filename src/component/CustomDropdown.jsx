import React from 'react'
import Form from 'react-bootstrap/Form';

export default function CustomDropdown(props) {
        const {AllOptions,selectedValue, onchange,itemIndex, name} = props;
  return (
    <div>
        <Form.Select value={selectedValue} name= {name} onChange={(e)=>onchange(e,itemIndex)} aria-label="Default select example">
      <option>Open this select menu</option>
      {AllOptions.map((item,index)=><option value={item.value} key={index}>{item.label}</option>)}
    </Form.Select>
    </div>
  )
}