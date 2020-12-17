import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Ingredient.css';
// import Form from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';

const Ingredients = () => {
  
  const initialState = {
    emailSubject: '',
    emailMessage: ''
  }
  
  const [ details, setDetails ] = useState(initialState);
 
  const [ receivers, setReceivers ] = useState();

  let fileReader;

  let emails;

  const handleFileRead = (e) => {
    
    const content = fileReader.result;

    const contentExtracted = content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);

    emails = contentExtracted;
    
    setReceivers(contentExtracted)
   
  }

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    
    fileReader.onloadend = handleFileRead;
    
    fileReader.readAsText(file);
   
  }

  const onSubmit = (e) => {
    e.preventDefault();
    
    let data = {details, receivers};

    // let data = details;
    axios.post('http://localhost:4000/email/send', data)
    .then(response => console.log(response));

  }

  return (
    <div className="App">
      <header>
        <div class="header">
          Bulk Email Sender
        </div> 
      </header>
      <section>

      <form onSubmit={onSubmit}>

      <div className="form-group">
        <label for='subject'>Email Subject<span class="required">*</span></label>
									<input
										type='text'
										required={true}
										id='emailSubject'
										value={details.emailSubject}
										placeholder='Enter Email Subject'
										onChange={(e) => setDetails({...details, emailSubject: e.target.value} )}
									/>
      </div>

      <div className="form-control">
          <label for='message'>Email Message<span class="required">*</span></label>
          <div>
          <textarea cols={60} rows={30} type='text' required={true} id='emailMessage' value={details.emailMessage} onChange={(e) => setDetails({...details, emailMessage: e.target.value} )}>
            Enter Email Here
          </textarea>
          </div>
         

      </div>

      <div className="form-control">
      <label for='message'>Upload .txt file<span class="required">*</span></label>
      
      <input
        type="file" 
        required={true}
        id='emailSubject'
        value={details.emailReceivers}
        onChange={(e) => {
        handleFileChosen(e.target.files[0]);
        setDetails({...details, emailReceivers: emails} )
        }}
      
      />
      </div>

      <div className="form-control">
      <button
						type="submit"
						color="primary"
					>
						Add
					</button>
      </div>

      </form>
      
      </section>
    </div>
  );
};

export default Ingredients;
