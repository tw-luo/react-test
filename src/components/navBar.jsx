import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

class NavBar extends Component {
  state = {};

  renderCalculator = () => {
    if (this.props.isLogin) {
      return (
        <li className="nav-item">
          <Link className="nav-link active" to="/calculator">
            计算器
          </Link>
        </li>
      );
    }
    return "";
  };

  handleLogout = (e) => {
    e.preventDefault();
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/calculator/logout/",
      type: "get",
      success: (resp) => {
        console.log(resp);
        if (resp.result === "success") {
          window.location.href = "/";
        }
      },
    });
  };

  renderUser = () => {
    if (this.props.isLogin === false) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" to="/login">
              登录
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/register">
              注册
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active">{this.props.username}</Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              onClick={
                this.handleLogout}
            >
              登出
            </Link>
          </li>
        </ul>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Calculator
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/home">
                    主页
                  </Link>
                </li>
                {this.renderCalculator()}
              </ul>
              {this.renderUser()}
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
