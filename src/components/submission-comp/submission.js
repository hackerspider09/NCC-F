import React from 'react'
import DataTable from "react-data-table-component";
import Modal from "react-modal"; 
import {  toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState,useEffect } from 'react';
import './submission.css'
import { AxiosInstance ,addAuthToken} from '../../Utils/AxiosConfig';
import { getToken} from '../../Utils/utils';



const getFormatedTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  
  return formattedTime // Display formatted time in h:mm:ss format
}

// var data={};
export default function Submission(props) {

  const [searchText, setSearchText] = useState('');
  const [selectedCode, setSelectedCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);   //for copy code
  const endPoint = `/api/submissions/?question=${props.questionId}`;

  const columns = [
    // {name:"ID",selector:"id",sortable: true },
    // { name: "Team", selector: "team", sortable: true },
    // { name: "Username", selector: "question", sortable: true },
    { name: "Language", selector: "language", sortable: true },
    { name: "Points", selector: "points", sortable: true },
    { name: "SubmissionTime", selector: "submissionTime", sortable: true, format: row => {
      const dateTime = new Date(row.submissionTime);
      const hours = dateTime.getUTCHours();
      const minutes = dateTime.getUTCMinutes();
      const seconds = dateTime.getUTCSeconds();
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      return timeString;
    }, },
    { name: "Status", selector: "status", sortable: true },
    { name: "Code", selector: "code", sortable: true, cell: (row) => <button className='viewbts' onClick={() => handleViewCode(row.code)}>View</button>
  },




]
const handleViewCode = (code) => {
  setSelectedCode(code);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedCode("");
};     
      
const [Subdata,setSubdata] = useState([]);
    useEffect(()=>{
      console.log(endPoint);
        addAuthToken(getToken());
        AxiosInstance.get(endPoint)
                .then((response) => {
                    console.log("enter in then ");
                    if (response.status) {
                        console.log("enter in then if ");
                        console.log(response.data);
                        
                        setSubdata(response.data)
                    }
                    else {
                        
                        console.log("Error In fetch");
                    }
                })
                .catch((error) => {
                    
                    console.log("enter in error ",error);
    
                })

                // const products = [{}]
      },[]);

      const handleCopy = () => {
        setCopied(true);
        toast.success("Copied",{autoClose:1000});
      };


  return (
    
    <div className="container">
        
    <div className="row">
      {/* <h1 className="mt-8 mb-7">Submissions</h1> */}
      {/* <div className='searchbar'>
      <input className='search-input'
          type="text"
          placeholder="Search by ID..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
          </div> */}
      <div className="Hello">
    
        <DataTable
        
          columns={columns}
          
          data={Subdata.filter((item) =>
            item.id.toString().includes(searchText.toLowerCase())
          )}
          pagination
          className="col custom-table"
        />
        <Modal className="modalpanti" isOpen={isModalOpen} onRequestClose={closeModal}>
          <div>
          <pre>{selectedCode}</pre>
          <CopyToClipboard text={selectedCode}>
            <button onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </CopyToClipboard>
          <button onClick={closeModal}>Close</button>
          {/* <button className='closebtn' onClick={closeModal}>Close</button> */}
          </div>
        </Modal>
      </div>
    </div>
  </div>
  )
}
