import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import Pgn from '../../common/Pgn';
import { setPlayAFriend } from '../../features/mainButtonsSlice';
import { closeCreateInviteCodeDialog } from '../../features/dialog/createInviteCodeDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import WsAction from '../../ws/WsAction';

const CreateInviteCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.createInviteCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Play a friend
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(closeCreateInviteCodeDialog())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      {state.mode.play && state.mode.play.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [dialogData, setDialogData] = React.useState({
    minutes: 5,
    increment: 3,
    color: 'rand'
  });

  const handleMinutesChange = (event: Event) => {
    setDialogData({
      minutes: event.target.value,
      increment: dialogData.increment,
      color: dialogData.color
    });
  };

  const handleIncrementChange = (event: Event) => {
    setDialogData({
      minutes: dialogData.minutes,
      increment: event.target.value,
      color: dialogData.color
    });
  };

  const handleCreateCode = () => {
    const settings = {
      min: dialogData.minutes,
      increment: dialogData.increment,
      color: dialogData.color === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : dialogData.color,
      submode: 'friend'
    };
    dispatch(setPlayAFriend());
    WsAction.startPlay(state, settings);
  }

  return (
    <DialogContent>
      <Typography
        id="input-minutes"
        align="center"
        gutterBottom
      >
        Minutes per side
      </Typography>
      <Slider
        name="min"
        aria-label="Minutes"
        defaultValue={5}
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={60}
        onChange={handleMinutesChange}
      />
      <Typography
        id="input-increment"
        align="center"
        gutterBottom
      >
        Increment in seconds
      </Typography>
      <Slider
        name="increment"
        aria-label="Increment"
        defaultValue={3}
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={60}
        onChange={handleIncrementChange}
      />
      <Grid container justifyContent="center">
        <SelectColorButtons props={dialogData} />
      </Grid>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => handleCreateCode()}
      >
        Create Code
      </Button>
    </DialogContent>
  );
}

const CopyCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <DialogContent>
      <TextField
        fullWidth
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        margin="normal"
        value={state.mode.play.hash}
      />
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          navigator.clipboard.writeText(state.mode.play.hash);
          dispatch(closeCreateInviteCodeDialog());
      }}>
        Copy and Play
      </Button>
    </DialogContent>
  );
}

export default CreateInviteCodeDialog;
