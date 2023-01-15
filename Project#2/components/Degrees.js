import React from 'react';
import getData from '../util/getData';
import { Grid,Segment } from 'semantic-ui-react';
import DModal from './degreeModal';

export default class Degrees extends React.Component{
    constructor(props){//1
        super(props);
        this.state={
            degrees:{},
            loaded:false
        }
    }
    componentDidMount(){//3
        getData('degrees/')
      .then(json=>{
        this.setState({
          degrees:json,
          loaded:true
        })
        //console.log(json);
      });
    }
    render(){//2, and change state
        //first, pull in data
        const {degrees,loaded}=this.state;
        if(!loaded)return(<div>degrees loading...</div>);
        return(
            <div>
                <Grid stackable columns='equal' textAlign='center'>
                    <Grid.Row><h3>Graduate</h3></Grid.Row>
                    <Grid.Row>
                        {degrees.graduate.map((pi) =>
                        <Grid.Column>
                        <div>   
                                <Segment><DModal{...pi}/></Segment>
                            </div></Grid.Column>
                    )}
                    </Grid.Row>

                    <Grid.Row><h3>Undergraduate</h3></Grid.Row>
                    <Grid.Row>
                        {degrees.undergraduate.map((pi) =>
                        <Grid.Column>
                        <div>
                                <Segment><DModal{...pi}/></Segment>
                        </div></Grid.Column>
                    )}
                    </Grid.Row>
                    
                </Grid>
                    
            </div>
        )
    }
}