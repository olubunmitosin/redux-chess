import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import { closeSearchEcoDialog } from './searchEcoDialogSlice';
import Opening from '../../common/Opening.js';
import OpeningSearchResultTable from '../../features/table/OpeningSearchResultTable.js';

const SearchEcoDialog = ({ props }) => {
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    setOpenings([]);
    setOpenings(Opening.byEco(event.target.value));
  }

  return (
    <Dialog open={state.searchEcoDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            ECO Code
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => {
              setOpenings([]);
              dispatch(closeSearchEcoDialog());
            }}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          required
          name="code"
          label="Select an option"
          defaultValue=""
          margin="normal"
          onChange={handleChange}
        >
          <MenuItem value="" disabled>
            Select an option
          </MenuItem>
          <MenuItem key={0} value="A">
            A: Flank Openings
          </MenuItem>
          <MenuItem key={1} value="B">
            B: Semi-Open Games other than the French Defense
          </MenuItem>
          <MenuItem key={2} value="C">
            C: Open Games and the French Defense
          </MenuItem>
          <MenuItem key={3} value="D">
            D: Closed Games and Semi-Closed Games
          </MenuItem>
          <MenuItem key={4} value="E">
            E: Indian Defenses
          </MenuItem>
        </TextField>
        <OpeningSearchResultTable props={{ openings: openings }} />
      </DialogContent>
    </Dialog>
  );
}

export default SearchEcoDialog;
