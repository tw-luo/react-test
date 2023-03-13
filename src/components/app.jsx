import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import NavBar from "./navBar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./contents/home";
import NotFound from "./errors/notFound";
import Register from "./contents/register";
import Login from "./contents/login";
import Calculator from "./contents/calculator";
import $ from "jquery";

class APP extends Component {
  state = {
    isLogin: false,
    username: "",
  };

  componentDidMount() {
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/calculator/get_status/",
      type: "get",
      success: (resp) => {
        console.log(resp);
        if (resp.result === "login") {
          this.setState({
            isLogin: true,
            username: resp.username,
          });
        } else {
          this.setState({
            isLogin: false,
          });
        }
      },
    });
  }

  visitCalulator() {
    if (this.state.isLogin) {
      return <Calculator />;
    } else {
      return <Navigate replace to="/login" />;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <NavBar isLogin={this.state.isLogin} username={this.state.username} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/calculator" element={this.visitCalulator()}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/404" element={<NotFound />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </React.Fragment>
    );
  }
}

export default APP;
