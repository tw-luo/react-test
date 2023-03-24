import React, { Component } from "react";
import $ from "jquery";
import ContentBase from "./contentBase";

class Register extends Component {
  state = {
    errorMessage: "",
    username: "",
    password: "",
    passwordConfirm: "",
  };

  handleClick = (e) => {
    e.preventDefault();
    if (this.state.username === "") {
      this.setState({ errorMessage: "用户名不能为空" });
    } else if (this.state.password === "") {
      this.setState({ errorMessage: "密码不能为空" });
    } else if (this.state.passwordConfirm === "") {
      this.setState({ errorMessage: "确认密码不能为空" });
    } else if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ errorMessage: "两次输入的密码不一致" });
    } else {
      $.ajax({
        url: "http://8.210.54.72:8000/game/api/register/",
        type: "get",
        data: {
          username: this.state.username,
          password: this.state.password,
          password_confirm: this.state.passwordConfirm,
        },
        dataType: "json",
        success: (resp) => {
          console.log(resp);
          if (resp.result === "success") {
            window.location.href = "/";
          } else {
            this.setState({ errorMessage: resp.result });
          }
        },
      });
    }
  };

  render() {
    return (
      <ContentBase>
        <form>
          <h3 className="registerHead">注册</h3>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="请输入用户名"
              onChange={(e) => {
                this.setState({
                  username: e.target.value,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="请输入密码"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">确认密码</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              placeholder="请再次输入密码"
              onChange={(e) => {
                this.setState({
                  passwordConfirm: e.target.value,
                });
              }}
            />
          </div>
          <div style={{ height: "2rem", color: "red" }}>
            {this.state.errorMessage}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
            onClick={this.handleClick}
          >
            确认
          </button>
        </form>
      </ContentBase>
    );
  }
}

export default Register;
