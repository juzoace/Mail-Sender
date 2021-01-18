import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
// import './Ingredient.css';
import "./Mailer.css"
// import { Link } from "react-router-dom";
const Mailer = (props) => {
  
  // const initialCall = () => {
  //   const activeUser = useSelector(state => state.successLoginResponse )
  //   console.log(activeUser);
  // }

  // useEffect(() => {
  //  initialCall()
  // }, [])
  const {
    successLoginResponse
  } = props

  // useEffect(() => {

  // }, [])
 
  const initialState = {
    emailSender: '',
    emailSubject: '',
    emailMessage: '',
    emailPassword: ''
  }
  console.log(successLoginResponse);
  const [ details, setDetails ] = useState(initialState);
 
  const [ receivers, setReceivers ] = useState();

  const [ passwordShown, setPasswordShown ] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  let fileReader;

  let emails;

  const handleFileRead = (e) => {
    
    const content = fileReader.result;
    console.log(content);
    const contentExtracted = content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);

    emails = contentExtracted;
    
    setReceivers(contentExtracted)
   
  }

  const handleFileChosen = (file) => {
    
    fileReader = new FileReader();
    
    fileReader.onloadend = handleFileRead;
    
    fileReader.readAsText(file);
   
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    let data = {details, receivers};

    // let data = details;
    // console.log("Didnt get respons.e")
    let res = await axios.post('http://localhost:4000/email/send', data)
    // .then(response => console.log(response));
    console.log(res);
    console.log("Didnt get response")

  }

  return (
    <div className="App">
      <header>
        <div class="header">
          Bulk Email Sender
        </div> 
      </header>
      <section>
      <div>
        {/* {successLoginResponse.user.username} */}
      </div>
      <form onSubmit={onSubmit}>

      <div className="form-group">
        <br></br>
        <label for='subject'>Sender Email Address<span class="required">*</span></label>
        <br></br>
									<input
                    className="form-input"
										type='email'
										required={true}
										id='emailSender'
										value={details.emailSender}
										placeholder='Enter Email Address'
										onChange={(e) => setDetails({...details, emailSender: e.target.value} )}
									/>
      </div>

      <div className="form-group">
        <br></br>
        <label for='subject'>Email Password<span class="required">*</span></label>
        <br></br>
									<input
                    className="form-input"
                    // type='password'
                    type= {passwordShown ? "text" : "password"}
										required={true}
										id='emailPassword'
										value={details.emailPassword}
										placeholder='Enter Email Password'
										onChange={(e) => setDetails({...details, emailPassword: e.target.value} )}
									/>
                  <br></br>
                  <button className="passwordControl" onClick={() => togglePasswordVisiblity()} > {passwordShown ? "Hide" : "Show"}</button>
      {/* <button  onClick={() => togglePasswordVisiblity()}>{passwordShown ? "Hide" : "Show"}</button> */}
      </div>
     
      <div className="form-group">
        <br></br>
        <label for='subject'>Email Subject<span class="required">*</span></label>
        <br></br>
									<input
                    className="form-input"
										type='text'
										required={true}
										id='emailSubject'
										value={details.emailSubject}
										placeholder='Enter Email Subject'
										onChange={(e) => setDetails({...details, emailSubject: e.target.value} )}
									/>
      </div>

      <br></br>
      <div className="form-group">
          <label for='message'>Email Message<span class="required">*</span></label>
          <div>
          <textarea cols={60} rows={30} type='text' required={true} id='emailMessage' value={details.emailMessage} onChange={(e) => setDetails({...details, emailMessage: e.target.value} )}>
            Enter Email Here
          </textarea>
          </div>
         <br></br>

      </div>

      <div className="form-group">
      <label for='message'>Upload .txt file containing Email List<span class="required">*</span></label>
      <br></br>
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

      <div className="form-group">
        <br></br>
      <button
						type="submit"
						color="primary"
					>
						Send Bulk Mail
					</button>
      </div>

        <br></br>
      </form>
      
      </section>
    </div>
  );
};
const mapStateToProps = ({auth}) => {
  return {
    successLoginResponse : auth.successLoginResponse
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onTryAutoSignup: () => dispatch(
    //   {
    //     type: actions.authCheckState(),
    //     // payload
    // }
    //  )

    // Get the Details from the local storage item 
  };
};

export default connect(mapStateToProps, {})(Mailer);
