import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

class NavBar extends Component {
  state = {};

  renderTest = () => {
    if (this.props.isLogin) {
      return (
        <React.Fragment>
          <li className="nav-item">
            <Link className="nav-link active" to="/test/memory">
              记忆力测试
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/test/reflex">
              反应力测试
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/test/focus">
              专注力测试
            </Link>
          </li>
        </React.Fragment>
      );
    }
    return "";
  };

  handleLogout = (e) => {
    $.ajax({
      url: "https://tw-luo-opulent-goldfish-w546v5j77gh56xj-8000.preview.app.github.dev/game/api/logout/",
      type: "get",
      success: (resp) => {
        console.log(resp);
        if (resp.result === "success") {
          window.location.href = "/";
        }
      },
    });
  };

  renderSuper = () => {
    if (this.props.isSuper===true) {
      return (
        <li className="nav-item">
          <a className="nav-link active" href="/admin">
            后台
          </a>
        </li>
      );
    }
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
            <Link className="nav-link active" onClick={this.handleLogout}>
              登出
            </Link>
          </li>
          {this.renderSuper()}
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
              能力测试
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
                {this.renderTest()}
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
