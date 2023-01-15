//semantic modals, unline in peopleModals. 
//modals that display minors, include title, description, courses, and notes.
import React from 'react'
import { Button, Header, Modal,Icon } from 'semantic-ui-react'
import getData from '../util/getData'
/*
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger= {<Button className='degreeSeg'>{title}</Button>}
    >
      <Modal.Header>{title}({name})</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
        <div><b>Description:</b><br/> <p style={{width:500}}>{description}</p></div>
        <div><h3>Courses:</h3><br/></div>
        <div>Note: <br/></div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>

*/
export default function MModal({name, title, description, courses,note}) {
  const [open, setOpen] = React.useState(false)
  var results;

  
  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger= {<Button className='degreeSeg'>{title}</Button>}
    >
      <Modal.Header>{title}({name})</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
        <div><b>Description:</b><br/> <p style={{width:500}}>{description}</p></div>
        <div><b>Courses:</b><br/>{courses.map((pi)=><Button onClick={function(){console.log(getCourse(pi))}}>{pi}</Button>)}</div>
        <div><b>Note: </b><br/>{note}</div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  )
}
async function getCourse(c){//fetchs courses, however since an extra setstate function doesn't work..
    var path = 'course/courseID='+c;
    
    getData(path).then(json=>{
      console.log(json);
      alert("Title: "+json.title+"\nDescription: "+json.description);
      return "seriously wtf";//somehow this line never gets returned or id think its funny
    });
}