//main.


import React from "react";
import './App.css';
import { Container, Header, Menu } from 'semantic-ui-react'
import getData from "./util/getData";
import Degrees from "./components/Degrees";
import Minors from "./components/Minors";
import Employment from "./components/Employment";
import PeopleTabs from "./components/PeopleTabs"

class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      about:{},
      loaded:false
    };
  }
  /*
      <PeopleTabs/>
      
      <Minors/>
      
      <Course/>
  */
  render(){
    const {loaded,about}=this.state;
    const items = [
      { key: 'Home', name: 'Home', href:".#home", active:"true" },
      { key: 'Degrees', name: 'Degrees', href:".#degrees" },
      { key: 'Minors', name: 'Minors', href:"#minors" },
      { key: 'Employment', name: 'Employment', href:"#employment" },
      { key: 'People', name: 'People', href:"#people" },
    ]
    if(!loaded){return <div>loading...</div>}
    return(
    <div className="App">
      <Container fluid className="Head">{/** the banner on top. sticky with navigations */}
        <Header
        
        as='h2'
        content='Welcome to iScool!'
        subheader={about.title}
        
      />
      <Menu items={items} />
      </Container>
      
      <Container text className="block" id="home">
      <div>{about.description}</div>
      <hr/>

      <div>
      <div>{about.quote}</div>
      <div className="right">{about.quoteAuthor}</div>
      </div>
      </Container>
      <Container className="block" id="degrees"><Degrees/></Container>
      <Container className="block" id="minors"><Minors/></Container>
      <Container className="block" id="employment"><Employment/></Container>
      <Container className="block" id="people"><PeopleTabs/></Container>
      </div>
      
      )
      
    
  }
  componentDidMount(){
    getData('about/')
      .then(json=>{
        this.setState({
          about:json,
          loaded:true
        })
        //console.log(json);
      });
  }


}

export default App;