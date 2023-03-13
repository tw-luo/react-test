import React, { Component } from "react";
import Card from "./card";
import $ from "jquery";

class Login extends Component {
  state = {
    errorMessage: "",
    username: "",
    password: "",
  };

  handleClick = (e) => {
    e.preventDefault();
    if (this.state.username === "") {
      this.setState({ errorMessage: "用户名不能为空" });
    } else if (this.state.password === "") {
      this.setState({ errorMessage: "密码不能为空" });
    }else {
        $.ajax({
            url: "c",
            type: "get",
            data: {
                username: this.state.username,
                password: this.state.password,
            },
            dataType: "json",
            success: resp => {
                console.log(resp.result);
                if (resp.result === "success") {
                    window.location.href="/";
                } else {
                    this.setState({errorMessage: resp.result});
                }
            }
        });
    }
  };

  render() {
    return (
      <Card style={{ marginTop: "20px" }}>
        <h3>Login</h3>
        <form>
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

export default Login;
