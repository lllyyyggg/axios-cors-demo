import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count:1,
//       msg:'hello world2', 
//       products : [
//         {id:1, name : 'Iphone Xmax'},
//         {id:2, name : 'Huawei Mate20'},
//         {id:3, name : 'Oppo R17'}
//       ], 
//       products_deleted : [
      
//       ]
//     }
//     this.increment = this.increment.bind(this);
//     this.decrement = this.decrement.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.removeFromLeft = this.removeFromLeft.bind(this);
//     this.removeFromRight = this.removeFromRight.bind(this);
//     this.doinc = this.doinc.bind(this);
//   }
//   removeFromLeft(event) {
//       let id = event.target.value
//       let newState = {...this.state}
//       let product = newState.products.find(v => v.id == id);
//       newState.products_deleted.push(product)
//       newState.products.splice(newState.products.findIndex(v => v.id == product.id), 1)
//       this.setState(newState)
//   }

//   removeFromRight(event) {
//     let id = event.target.value
//     let newState = {...this.state}
//     let product = newState.products_deleted.find(v => v.id == id);
//     newState.products.push(product)
//     newState.products_deleted.splice(newState.products_deleted.findIndex(v => v.id == product.id), 1)
//     this.setState(newState)
// }
//   increment() {
//    this.doinc(1);
//   }
//   decrement() {
//     this.doinc(-1);
//   }
//   doinc(inc) {
//     let newState = {...this.state};
//     newState.count = newState.count + inc;
//     this.setState(newState);
//   }
//   handleInputChange(event) {
//     let newState = {...this.state};
//     newState.msg = event.target.value;
//     console.log(newState.msg);
//     this.setState(newState);
//   }

  
//   render() {
  
//     return (
//       <div className="App">
//         <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
      

//           {/* 组件的state以及子组件修改父组件的值 */}
//           <h1>Hello World : {this.state.count}</h1>
//           <Button logo='+' increment={this.increment}></Button>
//           <Button logo='-' increment={this.decrement}></Button>

//           <br/>


//           {/* 双向数据绑定 */}
//           <textarea type='text' value={this.state.msg} onChange={this.handleInputChange}/>
//           <textarea type='text' value={this.state.msg} onChange={this.handleInputChange}/>

//           <div>
//             <table className='Solid-table-black'>
//               <thead>
//                 <tr>
//                   <td>id</td>
//                   <td>name</td>
//                   <td>delete</td>
//                 </tr>
//               </thead>
//               <tbody>
//               {
//                 this.state.products.map((product, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>{product.id}</td>
//                       <td>{product.name}</td>
//                       <td><button onClick={this.removeFromLeft} value={product.id}>删除</button></td>
//                     </tr>
//                   )
//                 })
//               }
//               </tbody>
//             </table>

//             <table className='Solid-table-blue'>
//               <thead>
//                 <tr>
//                   <td>id</td>
//                   <td>name</td>
//                   <td>delete</td>
//                 </tr>
//               </thead>
//               <tbody>
//               {
//                 this.state.products_deleted.map((product, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>{product.id}</td>
//                       <td>{product.name}</td>
//                       <td><button onClick={this.removeFromRight} value={product.id}>删除</button></td>
//                     </tr>
//                   )
//                 })
//               }
//               </tbody>
//             </table>
//         </div>
//         </header>
//       </div>
//     );
//   }
// }

// class Button extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <button onClick={this.props.increment}>{this.props.logo}</button>
//     );
//   }
// }


class Span extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span>{this.props.content}</span>
    );
  }
}
class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={this.props.changeToInput} value="Got Clicked">click</button>
    );
  }
}
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(){}
  render() {
    return (
      <input type="text" value={this.props.value} onChange={this.handleChange}></input>
    );
  }
}

class Select extends React.Component {
  constructor(props) {
    super(props);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeFromSpanToInput=this.changeFromSpanToInput.bind(this);
    this.getButton = this.getButton.bind(this);

    this.state = {
      body: <Span content="Hello World"></Span>,
      button: this.getButton(this.changeFromSpanToInput)
    }
  }
  rows = [
  
  ];
  getButton(changeToInputFunc) {
    return (<Button changeToInput={changeToInputFunc}></Button>);
  }
  componentDidMount() {
    let api="http://218.77.105.241:40080/jc/login";
    
    axios.post(api,{username:'admin',password:'123'}).then(res => {
      console.log(res.status);
      console.log(res.headers);
      console.log('auth = ' + res.headers.authorization);
      console.log('token = ' + res.headers.token);
      console.log('data = ' + res.data.token);
    })
    // api="http://218.77.105.241:40080/jc/role/getAll";
    // axios.get(api,{headers:{'Authorization':'JCeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1bUk9MRV9BVVRIX1JPTEVfREVMRVRFLCBST0xFX0FVVEhfQVVUSF9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1VQREFURSwgUk9MRV9BVVRIX01FTlVfU0FWRSwgUk9MRV9BVVRIX1JPTEVfVVBEQVRFLCBST0xFX0FVVEhfQVVUSF9ET1dOTE9BRCwgUk9MRV9BVVRIX01FTlVfRE9XTkxPQUQsIFJPTEVfQVVUSF9NRU5VX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9TQVZFLCBST0xFX0FVVEhfTUVOVV9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1FVRVJZLCBST0xFX0FVVEhfUk9MRV9BVURJVCwgUk9MRV9BVVRIX1JPTEVfUFJJTlQsIFJPTEVfQVVUSF9NRU5VX1FVRVJZLCBST0xFX0FVVEhfTUVOVV9BVURJVCwgUk9MRV9BVVRIX1JPTEVfVVBMT0FELCBST0xFX0FVVEhfUk9MRV9ET1dOTE9BRCwgUk9MRV9BVVRIX0FVVEhfU0FWRSwgUk9MRV9BVVRIX0FVVEhfQVVESVQsIFJPTEVfQVVUSF9BVVRIX1BSSU5ULCBST0xFX0FVVEhfTUVOVV9VUExPQUQsIFJPTEVfQVVUSF9ST0xFX1FVRVJZLCBST0xFX0FVVEhfTUVOVV9VUERBVEUsIFJPTEVfQVVUSF9BVVRIX1VQTE9BRF0iLCJleHAiOjE1NDIwODUzNDN9.KlySqYcpOv8GEmXYgg0kwIkEE5-aZBvIawEko7h433lJRILBUC46Tk6u2bYsBQVU01z7pOLcXvdGYJ9gopvlPw'}})
    // .then(res => {
    //   console.log(res.status);
    //   console.log(res.data);
    // })
  }
  changeFromSpanToInput() {
    console.log("hello")
    console.log(this.state)
    let newState = {...this.state};
    console.log(newState)
    newState.body = <Input value="Hello Input"></Input>
    this.setState(newState);
  }

  
  render() {
    return (
      <div>
        {this.state.body}
        {this.state.button}
        </div>
      );
  }
  
}
export default App;
