//semantic modals, unline in peopleModals. 
//modal, puts out degrees,if its the available certificates there is some differences made.

import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

export default function DModal({degreeName,title,description,concentrations,availableCertificates}) {
  const [open, setOpen] = React.useState(false)
  var trig;//trigger
  var content;//modal content
    if(availableCertificates){
        trig = degreeName;
        content = <div>{availableCertificates.map((availableCertificate, i)=><p key={i}>{availableCertificate}</p>)}</div>
    }else{
        trig = title;
        content = (
          <div>
            <Header>Degree Name: {degreeName}</Header>
            <div><b>Description:</b><br/> <p style={{width:500}}>{description}</p></div>
            <ul><b>Concentrations: </b>
                {concentrations.map((concentration, i)=><li key={i}>{concentration}</li>)}
            </ul>
          </div>
          
        )
    }

    //console.log ({concentrations});
  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger= {<Button className='degreeSeg'>{trig}</Button>}
    >
      <Modal.Header>{trig}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            {content}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Done"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
        />
      </Modal.Actions>
    </Modal>
  )
}