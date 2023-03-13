import React, { Component } from 'react';
import Card from './../components/card';

class NotFound extends Component {
    state = {  } 
    render() { 
        return (
            <Card style={{marginTop:"20px"}}>The Page is Not Found</Card>
        );
    }
}
 
export default NotFound;