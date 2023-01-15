//modal that displays all people. 
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PModal({username,name,tagline,title,interestArea,office,website,phone,email,twitter,facebook,imagePath}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h3>{name}</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {tagline}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {title}
          </Typography>
          {imagePath &&
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <img src={imagePath} style={{maxWidth:'150px', float:'right'}} alt='person'></img>
            </Typography>
          }
          {website &&
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <a href={website} target="_blank">{name}'s website</a>
            </Typography>
          }
          {office&&
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            office: {office}
          </Typography>
          }
        </Box>
      </Modal>
    </div>
  );
}
