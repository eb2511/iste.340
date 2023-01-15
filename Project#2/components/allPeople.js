import React from "react";
import getData from '../util/getData';
import PModal from "./peoplemodal";
import BasicModal from "./peoplemodal";

export default class AllPeople extends React.Component{
    constructor(props){//1
        super(props);
        this.state={
            people:props.pepGroup,
            title:props.title
        }
    }
    render(){//2, and change state
        const{people,title}=this.state;
        const cName="peopleListItem"+title;
        return(
            
            <div>
                    {/*iterate all the faculty*/}
                    <div className="peopleList">
                    {people.map((pi,i) =>
                        <div className={cName} key={i}>
                            <img src={pi.imagePath} style={{maxWidth:'150px'}} alt='person'></img>
                            <PModal {...pi}/>
                            </div>
                    )}
                    </div>
                </div> 
        )
    }
}