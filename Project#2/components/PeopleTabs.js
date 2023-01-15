import React from 'react';
import { Tab,Header } from 'semantic-ui-react';
import getData from '../util/getData';
import AllPeople from './allPeople';
/*
const panes = [
  { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
]

const TabExampleBasic = () => <Tab panes={panes} />

export default TabExampleBasic
*/

//change into class
export default class PeopleTabs extends React.Component{
    constructor(props){
        super(props);//always the first line
        this.state={
            loaded:false,
            people:{}
        }
    }
    render(){
        const {people,loaded}=this.state;
        const panes = [
            { menuItem: 'Faculty', render: () => <Tab.Pane><AllPeople title="faculty" pepGroup={people.faculty} key="1"/></Tab.Pane> },
            { menuItem: 'Staff', render: () => <Tab.Pane><AllPeople title="staff" pepGroup={people.staff} key="2"/></Tab.Pane> }
          ]
        const color='green';
        if(!loaded){return (<div><h1>People loading...</h1></div>)}
        return(

            <div>
                <Header as="h2" content={people.title} subheader={people.subTitle}/>
                <Tab panes={panes} />
            </div>
        )
    }
    componentDidMount(){
        getData('people/')
        .then((json) =>{
            this.setState({
                people:json,
                loaded:true
            })
        })
    }
}