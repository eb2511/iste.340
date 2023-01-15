import React from "react";
import getData from '../util/getData';
import BasicModal from "./peoplemodal";

export default class People extends React.Component{
    constructor(props){//1
        super(props);
        this.state={
            people:{},
            loaded:false
        }
    }
    componentDidMount(){//3
        getData('people/')
      .then(json=>{
        this.setState({
          people:json,
          loaded:true
        })
      });
    }
    render(){//2, and change state
        //first, pull in data
        const {people,loaded}=this.state;
        if(!loaded)return(<div>People loading...</div>);
        return(
            <div>
                <h1>{people.title}</h1>
                <h3>{people.subTitle}</h3>
             
                    {/*iterate all the faculty*/}
                    <h2>faculty</h2>
                    <div className="peopleList">
                    {people.faculty.map((pi) =>
                        <div className="peopleListItem">
                            <img src={pi.imagePath} style={{maxWidth:'150px'}} alt='faculty person'></img>
                            <div>{pi.name}</div>
                            <BasicModal {...pi}/>
                            </div>
                    )}
                    </div>
                    {/*iterate all the staff*/}
                    <h2>staff</h2>
                    <div className="peopleList">
                    {people.staff.map((pi) =>
                        <div className="peopleListItem">
                            <img src={pi.imagePath} style={{maxWidth:'150px'}} alt='faculty person'></img>
                            <div>{pi.name}</div>
                            <BasicModal {...pi}/>
                            </div>
                            
                    )}
                </div> 
                </div>
        )
    }
}