import React, { useState, useEffect } from "react";
import { Button} from 'react-bootstrap';
import work from "./contracts/work.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './Create.js'

import Popup from 'reactjs-popup';
import { BrowserRouter, Route, Link } from "react-router-dom";

import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  
  const [name, setname] = useState("");
  const [amount, setamount] = useState(0);
  const [ngos, setngos] = useState([]);
  const [id, setid] = useState();
  const [email, setemail] = useState("");
 



  const add = () => {
    contract.methods.create(amount,name,email).send({from: account}, (error)=>{
      if(!error){
          
          setname("");
          setemail("");
          setamount(0);
      }
    });
  }
  
  const donate = () =>{
    const am = amount*1000000000000000000;
    contract.methods.donate(id).send({from: account, value: am} , (error)=>{
        if(!error){
            setamount(0);
        }
    });
  }
  


  const load = async (contract) => {
    const totalSupply = await contract.methods.getcount().call();
    console.log(totalSupply);
    console.log("trying again");
    let results = [];
    for(let i = 0; i < totalSupply; i++){
     // console.log("reached");
     
      let ngos = await contract.methods.getdata(i).call();
      
      results.push(ngos);
      
    }
    setngos(results);
  }
  
  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
    }
  }

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = work.networks[networkId];
    if(networkData){
      const abi = work.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  }

  useEffect(async ()=>{
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    await load(contract);
  }, [])

  return (
    <body className="bgimage">
      <div>
        <nav className="navbar navbar-light bg-light px-4">
          <a className="navbar-brand">ONLINE NGO DONATION PLATFORM </a>
          <span> Current Account : {account}</span>
        </nav>

        <div className="elementor-widget-container box1">
          <div className="elementor-text-editor elementor-clearfix box2">
            
            <p>&nbsp;</p>
            <p>
            NGOs (Non-Governmental Organizations) work to advance social or political alter and play a basic part in creating society, making strides communities, and advancing citizen support.
            </p>
            <p>&nbsp;</p>
            <p>
            NGOs have been playing a vital part in autonomous India, bridging the hole between government plans and recipients in farther zones. Their promotion has moreover contributed to path-breaking laws counting the Correct to Instruction Act and the Correct to Data Act.
            </p>
            <p>
              HELP EVERYONE
            </p>{" "}

            <div>
          <h4 className="btnc2">Want To Create A Request</h4>
          <Popup
            trigger={<button className="btn btn-primary btnc"> Create</button>}
            position="top"
          >
            <div className="container-fluid mt-5">
              <div className="row pborder">
                <div className="col pfont1">
                  Create a Request
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      className="form-control mb-2"
                      placeholder="Enter name of NGO"
                    />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      className="form-control mb-2"
                      placeholder="Enter NGO Website"
                    />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setamount(e.target.value)}
                      className="form-control mb-2"
                      placeholder="Enter Donation Amount"
                    />

                    <button onClick={add} className="btn btn-primary">
                      {" "}
                      Create{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </div>
          </div>
        </div>

        
      <div className="custbx">
        <div className="col-8 d-flex justify-content-center flex-wrap custom1">
          {ngos.map((ngos, key) => (
            <div
              className="d-flex flex-column align-items-center border custom1 custom2"
              key={key}
            >
              {/* <img width="150" src={`https://avatars.dicebear.com/api/pixel-art/${coder.replace("#", "")}.svg`} /> */}
              <span>
                <span className="customfont">Name:</span> {ngos.ngoname}
              </span>
              <br />
              <span>
                <span className="customfont"></span>{" "}
                <a href={ngos.web}>{ngos.web} </a>
              </span>
              <br />
              <span>
                <span className="customfont">Requested Amount:</span>{" "}
                {ngos.amount}
              </span>
              <br />
              <span>
                <span className="customfont">Amount Donated: </span>
                {ngos.donated}
              </span>
              <br />

              <div>
                <input
                  type="number"
                  onChange={(e) => {
                    setamount(e.target.value);
                    setid(ngos.id);
                  }}
                  className="form-control mb-2 custombtn"
                  placeholder="Donation Amount (eth)"
                />

                <button className="btn btn-primary" onClick={donate}>
                  {" "}
                  Donate{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      <div></div>

      <div>
        {" "}
        <br></br>
      </div>
      <div>
        {" "}
        <br></br>
      </div>
      <div>
        {" "}
        <br></br>
      </div>
      <div>
        {" "}
        <br></br>
      </div>
      <div>
        {" "}
        <br></br>
      </div>
      <div>
        {" "}
        <br></br>


        <div className="footer">

          <div className="footer2"> HELP EVERYONE</div>
          <div className="footer1"> Ngo Management project using blockchain</div>
          
          
          <br></br>


        </div>
      </div>
    </body>
  );
};

export default App;