//puts out modal with coop table and employment table.
import React from 'react'
import { Button, Icon, Image, Modal, Table } from 'semantic-ui-react'

export default function EModal  ({title,coopInformation,professionalEmploymentInformation})  {
  const [open, setOpen] = React.useState(false);
  var result=[]
    if(coopInformation){
        for(var i=0;i<coopInformation.length;i++){
            result.push(
                <Table.Row>
                            <Table.Cell>{coopInformation[i].employer}</Table.Cell>
                            <Table.Cell>{coopInformation[i].degree}</Table.Cell>
                            <Table.Cell>{coopInformation[i].city}</Table.Cell>
                            <Table.Cell>{coopInformation[i].term}</Table.Cell>
                </Table.Row>
            )
        }
    }else{
        for(var i=0;i<professionalEmploymentInformation.length;i++){
            result.push(
                <Table.Row>
                            <Table.Cell>{professionalEmploymentInformation[i].employer}</Table.Cell>
                            <Table.Cell>{professionalEmploymentInformation[i].degree}</Table.Cell>
                            <Table.Cell>{professionalEmploymentInformation[i].city}</Table.Cell>
                            <Table.Cell>{professionalEmploymentInformation[i].term}</Table.Cell>
                        </Table.Row>
            )
        }
    }
  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button className='degreeSeg'>{title}</Button>}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content scrolling>
        
        <Modal.Description>
        <Table celled padded striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Employer</Table.HeaderCell>
                                <Table.HeaderCell>Degree</Table.HeaderCell>
                                <Table.HeaderCell>City</Table.HeaderCell>
                                <Table.HeaderCell>Term</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {result}
                            
                </Table.Body>
                </Table>
        
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  )
}

