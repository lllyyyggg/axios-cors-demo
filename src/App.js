import React from 'react';
import { Input, Icon, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
// import axios from 'axios';

class App extends React.Component {
  componentDidMount() {
    // const host = "http://localhost:8081"
    // axios.delete(`${host}/delete/1001`,{
    //   headers:{test:"test"},
    //   params:{test:"test"}
    // })
    // .then(res => {
    //   console.log(res.data);
    // })

    // axios.post(`${host}/users`, {
    //     id:4,
    //     name: 'alibaba'
    // },{
    //   headers:{
    //     "Lanyage":"good guy"
    //   }
    // }).then(res => {
    //   console.log(res.data)
    // })
  }
  
  render() {
    return (
      <div className={`full-height`} id="wrapper">  
        <div className='gutter-box' style={{minWidth: '290px'}}>
              <div className='login-box'>
               
                  <img src={require(`../src/logo-lg.svg`)} style={{width:'25.5%'}} alt=''></img>
                  <div style={{height:'10%'}}></div>
                  <div style={{padding: '0px 28px 0px 28px', height:'50%'} }>
                    <Input className='login-input' size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="请输入用户名称"/>
                    <div style={{height:'10%'}}></div>
                    <Input className='login-input' type='password' size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码登录" />
                    <div style={{height:'10%'}}></div>
                    <Checkbox style={{float:'left'}}>记住登录状态</Checkbox>
                    <div style={{height:'20%'}}></div>
                    <Button size='large' type="primary" style={{width:'100%', fontSize:'14px'}} >
                      登录
                    </Button>
                    </div>
              </div>
        </div>
        <div style={{left:'0px',position:'fixed',height:'80px',width:'100%',bottom:'0px',textAlign:'center', fontSize:'11px'}} className='copy-right' id="copy-right">
          <img src={require(`../src/logo.png`)} style={{height:'38%'}} alt=''></img>
          <br/>
          <div style={{height:'10%'}}></div>
          <span>长沙矿冶研究院智能技术研究所提供技术支持</span>
        </div>
      </div>
    );
  }
  
}

export default App;
