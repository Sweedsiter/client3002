import React, { useEffect, useState } from 'react'
import axios from 'axios' //ดึงข้อมูล
import '../App.css'
function Formproduct() {
    const [data,setData] = useState([]) //เรียกข้อมูลทั้งหมด
    const [readOne,setReadOne] = useState("")
    const [form,setForm] = useState({})
    const [updata_id , setUpData] = useState({
        
    })
    useEffect(()=>{
        loadData()
    },[])
//เรียก GET-DATAS
const loadData =async () =>{
 return await axios.get(process.env.REACT_APP_API+'/product')
 .then((res)=> setData(res.data)).catch((err)=>console.log(err))
}
// GET-READ อ่านที่ละITEM
const read =async (id) =>{
    return await axios.get(process.env.REACT_APP_API+'/product/'+id)
    .then((res)=> setReadOne(res.data)).catch((err)=>console.log(err))
   }
// Clear item
const clearItem = () =>{
    setReadOne('')
}
//Post Add
const handlechange = async(e)=>{     
       setForm({...form,[e.target.name]: e.target.value})
}
const handleSubmit = async (e)=>{
   // e.preventDefault() 
    await axios.post(process.env.REACT_APP_API + '/product',form)
    .then((res)=>{
        console.log(res)
        loadData()
    })
    .catch((err)=>console.log(err))   
}

//REMOVE
const remove = async (id) =>{
    await axios.delete(process.env.REACT_APP_API + '/product/'+id)
    .then((res)=>{
        console.log(res)
        setReadOne("")
        loadData()
    })
    .catch((err)=>console.log(err))
}
//Update
const upData_id = async (id) =>{
    await axios.get(process.env.REACT_APP_API +'/product/'+id)
    .then((res)=>{       
        setUpData(res.data)
    }) 
    .catch(err=>console.log(err))   
}
const handlechangeUpdate = (e) =>{
    setUpData({
        ...updata_id,[e.target.name]: e.target.value
    })
}
console.log(updata_id)

const handleUpdate = async (e)=>{
    //e.preventDefault()   
    await axios.put(process.env.REACT_APP_API + '/product/'+updata_id._id,updata_id)   
    .then(res=>{
       console.log(res.data)        
    })
    .catch((err)=>{console.log(err)})   
 }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' placeholder='name' onChange={e=>handlechange(e)}/><br/>
            <input type="text" name='detail' placeholder='detail'  onChange={e=>handlechange(e)}/><br/>
            <input type="Number" name='price' placeholder='price'  onChange={e=>handlechange(e)}/><br/>
            <button >Submit</button>
        </form>
 <table className="App">
  <tbody>   
     { data ? data.map((item,index)=>
        <tr key={index}>
          <td >{index+1}</td>
          <td>{item.name}</td>       
          <button onClick={()=>read(item._id)}>ข้อมูลเพิ่มเติม</button>                   
        </tr>) : null 
     }             
  </tbody>

</table> 
<table>
  <thead>
    <tr>
      <th scope="col">Number</th>
      <th scope="col">name</th>
      <th scope="col">detail</th>
      <th scope="col">price</th>
    </tr>
  </thead>
  <tbody>   
     {
       <tr>
        <td>{readOne.name}</td>
        <td>{readOne.detail}</td>
        <td>{readOne.price}</td>
        {readOne ? <button onClick={()=>upData_id(readOne._id)}>Edit</button> :  false}     
        {readOne ? <button onClick={()=>remove(readOne._id)}>Delete</button> :  false}     
       </tr>
     }     
      <button onClick={clearItem}>Clear</button>        
  </tbody>
  </table> 
     <form onSubmit={handleUpdate} >
            <input type="text" name='name' placeholder='name'  onChange={e=>handlechangeUpdate(e)} value={updata_id.name}/><br/>
            <input type="text" name='detail' placeholder='detail'   onChange={e=>handlechangeUpdate(e)} value={updata_id.detail}/><br/>
            <input type="Number" name='price' placeholder='price'    onChange={e=>handlechangeUpdate(e)} value={updata_id.price} /><br/>
            <button >Submit</button>
     </form> 
    </div>
  )
}

export default Formproduct