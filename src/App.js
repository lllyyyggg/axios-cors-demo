import React from 'react';
import axios from 'axios';

class App extends React.Component {
  componentDidMount() {
    const host = "http://localhost:8081"
    axios.delete(`${host}/delete/1001`,{
      headers:{test:"test"},
      params:{test:"test"}
    })
    .then(res => {
      console.log(res.data);
    })

    axios.post(`${host}/users`, {
        id:4,
        name: 'alibaba'
    },{
      headers:{
        "Lanyage":"good guy"
      }
    }).then(res => {
      console.log(res.data)
    })
  }

  
  render() {
    return (
      <div>
        <h1>Hello World!!! This is CORS@@</h1>
      </div>
    );
  }
  
}
export default App;
