import React, { Component } from "react";
import Card from './card';


class Home extends Component {
  state = {};
  
  getData(){
    if(this.props.isLogin){
      return (
        <React.Fragment>
          <div>{this.props.username+"，您好。"}</div>
          <div>欢迎来到能力测试系统。</div>
        </React.Fragment>
      )
      
      
    }else{
      return "请登录后再使用"
    }
  }

  render() {
    return (
        <Card style={{marginTop:"20px"}}>{this.getData()}</Card>
    );
  }
}

export default Home;
