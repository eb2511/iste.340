import { Tab } from '@mui/material';
import React from 'react';
import { Container,Header, Table, Segment, Grid } from 'semantic-ui-react';
import getData from '../util/getData';
import EModal from './employmentModal';

export default class Employment extends React.Component{
    constructor(props){//1
        super(props);
        this.state={
            employment:{},
            loaded:false
        }
    }
    componentDidMount(){//3
        getData('employment/')
      .then(json=>{
        this.setState({
          employment:json,
          loaded:true
        })
        //console.log(json);
      });
    }
    render(){//2, and change state
        //first, pull in data
        const {employment,loaded}=this.state;
        if(!loaded)return(<div>employment loading...</div>);
        return(
            <div>
                <div style={{'margin':'10px'}}>
                    <Header as='h2' content='Employment' subheader={employment.introduction.title}/>
                    <Container text>{/* Intro */}
                        
                        {employment.introduction.content.map((pi,i)=>
                        <div key={i}><b>{pi.title}</b><br/>{pi.description}<hr/></div>)}
                    </Container>
                    <Container fluid>{/* {employment.degreeStatistics} */}
                            
                            <Grid stackable columns='equal'>
                            <Grid.Row><h3>{employment.degreeStatistics.title}</h3></Grid.Row>
                                {employment.degreeStatistics.statistics.map((pi,i)=>
                                        <Grid.Column><Segment key={i} >{pi.value}{pi.description}</Segment></Grid.Column>
                                )}
                            </Grid>
                            
                    </Container>

                    <Container fluid>{/* {employment.employers, careers} */}
                            
                            <Grid divided stackable columns='equal'>
                            <Grid.Row><h3>{employment.employers.title}</h3></Grid.Row>
                            {employment.employers.employerNames.map((pi,i) =>
                            <Grid.Column><div key={i}>{pi}</div></Grid.Column>
                    )}
                            <Grid.Row><h3>{employment.careers.title}</h3></Grid.Row>
                        {employment.careers.careerNames.map((pi,i) =>
                            <Grid.Column><div key={i}>{pi}</div></Grid.Column>
                        )}
                    </Grid></Container>
                
                {/* The big table, there are two big taables don't forget to put them into modals */}
                <Container fluid>
                    <Grid stackable columns='equal'>
                        <Grid.Column><Segment><EModal {...employment.coopTable}/></Segment></Grid.Column>
                        <Grid.Column><Segment><EModal {...employment.employmentTable}/></Segment></Grid.Column>
                    </Grid>
                    
                
                </Container>
                
                </div>

            </div>
        )
    }
}