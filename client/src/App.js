import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React,{useState,useEffect} from 'react';
import QRCode from "qrcode.react";
import { Alert } from 'bootstrap';

function App() {
  const [data, setData] = useState([]);
  const [url,seturl]=useState('')

  const handleUpdateClick = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/update/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (res.status === 200) {
        await getall();
        
      } else if (res.status === 404) {
        console.log("error")
      } 
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async ()=>{
    if(url===''){
      alert("Pls fill some Thing");

      return;
    }
    else{
      const res = await fetch("http://localhost:5000/api/creat-short-url", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalURL: url }), 
      });
      console.log(await res.json()); 
      seturl('')
      getall();
    }
     
  }
  const getall = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-all-url");
        const getallUrl = await response.json();
        setData(getallUrl); // กำหนดข้อมูลลงใน state data
      } catch (error) {
        console.error(error);
      }
    }
  
  useEffect(() => {
    
    getall();
  }, []);
  
  return (
    <div className="App">
      <header className='mt-5 mb-5'>
          <div>
            <h3 className='mb-5'>
              SHORT URL 
            </h3>
          </div>
          <div className='ms-5 mx-5'>
          <form>
            <div className='col-12'>
                <div className='input-group'>
                  <input type="text" className="form-control" placeholder="Enter your URL need to change" onChange={(e)=>{seturl(e.target.value)}}/>
                  <button type="button" className="btn btn-info" onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </form>
           <div>
            </div> 
           
          </div>
      </header>
      <table className="table">
  <thead className='ms-2 mx-2'>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Original URL</th>
      <th scope="col">Short URL</th>
      <th scope="col">Clicks</th>
      <th scope="col">QrCode</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.orginal_url}</td> 
        <td><a href={"http://localhost:5000/"+item.short_url} target="_blank" onClick={() => handleUpdateClick(item.id)}>{"http://localhost:5000/"+item.short_url}</a></td>
        <td>{item.click}</td>
        <td>
          
        <QRCode
          value={item.orginal_url}
          size={64} // กำหนดขนาดของ QR code ตามที่คุณต้องการ
        />
      </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );

  }
export default App;
