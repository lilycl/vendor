import React from 'react';
import ReactDOM from 'react-dom';
import globalConfig from 'config';
import {message} from 'antd';
import './index.less';

/**
 * 定义Login组件
 */
class Login extends React.Component {

  // 这个login组件是直接从网上找的: https://colorlib.com/wp/html5-and-css3-login-forms/
  // 不是react风格...
  // TODO: 以后要把这个login组件改掉

  handleSubmit = (e) => {
    e.preventDefault();  // 这个很重要, 防止跳转
    const hide = message.loading('正在验证...', 0);

    const username = ReactDOM.findDOMNode(this.refs.user).value;
    const password = ReactDOM.findDOMNode(this.refs.pass).value;

    const button = ReactDOM.findDOMNode(this.refs.button);
    button.setAttribute('disabled', 'true');  // 暂时屏蔽提交按钮, 防止用户重复点击

    // 服务端验证
    ajax.post(`${globalConfig.getAPIPath()}${globalConfig.login.validate}`).type('form').send({
      username,
      password,
    }).end((err, res) => {
      hide();

      if (ajax.isSuccess(res)) {
        // 如果登录成功, 调用回调函数, 把状态往上层组件传
        if (this.props.loginSuccess)
          this.props.loginSuccess(res.body.data, true);
        else
          message.info(`登录成功, 用户名: ${res.body.data}`);
      } else {
        message.error(`登录失败: ${res.body.message}, 请联系管理员`);
        button.removeAttribute('disabled');  // 登录失败的话, 重新让按钮可用, 让用户重新登录
      }
    });
  }

  componentWillMount() {
    document.body.style.background = '#fff';
  }

  componentWillUnmount() {
    // 组件unmount时设置下样式, 不然其他组件的显示会有问题
    // TODO: 不知道有没有更好的办法
    document.body.style.background = 'white';
  }

  render() {
    return (
      <div className="loginwrap">
        <h1 className="title">质选<span>运营后台</span></h1>
        <div className="login-bg">
          <div className="login">
            <h1>平台登录</h1>
            <form onSubmit={this.handleSubmit}>
              <input className="login-input" type="text" ref="user" name="u" placeholder="用户名" required="required"/>
              <input className="login-input login-password" type="password" ref="pass" name="p" placeholder="密码" required="required"/>
              <button ref="button" type="submit" className="btn  btn-block btn-large">登录</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default Login;
