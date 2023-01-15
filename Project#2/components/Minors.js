import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import getData from '../util/getData';
import MModal from './minorModal';

export default class Minors extends React.Component{
    constructor(props){//1
        super(props);
        this.state={
            minors:{},
            loaded:false
        }
    }
    componentDidMount(){//3
        getData('minors/')
      .then(json=>{
        this.setState({
          minors:json,
          loaded:true
        })
        //console.log(json);
      });
    }
    
    render(){//2, and change state
        //first, pull in data
        const {minors,loaded}=this.state;
        if(!loaded)return(<div>minors loading...</div>);
        return(
            <div>
                <div>
                    <h3>Minors</h3>
                    <div className='minorDiv'>
                {minors.UgMinors.map((pi,i) =>
                                <div key={i}><Segment><MModal{...pi}/></Segment></div>
                    )}
                </div>    
                </div>

            </div>
        )
    }
}