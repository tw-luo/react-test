import React, { Component } from "react";
import Card from "./card";
import $ from "jquery"

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
        url: "https://app165.acapp.acwing.com.cn/calculator/register/",
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
      <Card style={{ marginTop: "20px" }}>
        <form>
          <h3>Register</h3>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              onChange={(e) => {
                this.setState({
                  username: e.target.value,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              placeholder="Confirm password"
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
            Submit
          </button>
        </form>
      </Card>
    );
  }
}

export default Register;
