import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EXPERIMENT_PROFILES, ExperimentProfile } from './experimentProfiles';

interface ExperimentState {
  profiles: ExperimentProfile[];
  activeProfileId: string;
}

const initialState: ExperimentState = {
  profiles: EXPERIMENT_PROFILES,
  activeProfileId: EXPERIMENT_PROFILES[0].id
};

const experimentSlice = createSlice({
  name: 'experiments',
  initialState,
  reducers: {
    setActiveProfile(state, action: PayloadAction<string>) {
      state.activeProfileId = action.payload;
    }
  }
});

export const { setActiveProfile } = experimentSlice.actions;
export default experimentSlice.reducer;
