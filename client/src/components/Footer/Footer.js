
import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import "./Footer.css";

const Footer = () => {

    const footerTime = new Date().getFullYear()
    const [footerDate, setFooterDate ] = useState(footerTime);

    return (
        <div className="footer">
            {footerDate}
        </div>
    )
}

// Footer.proptypes = {

// }

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => { 
   
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)