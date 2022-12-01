import React, { useState } from 'react';
import './App.css';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch } from './app/hooks';
import { decrement, increment } from './features/counter/counterSlice';
const options = ['Increase', 'Decrease'];
const App: React.FC = () => {
  const [selectValue, setSelectValue] = useState('');
  const dispatch = useAppDispatch();
  const onSelectAllChange = (e: SelectChangeEvent<string>) => {
    const newValue = e.target.value;
    // 假设逻辑是选increase时触发增加的action，选decrease时触发减少的action
    if (newValue === 'Increase') {
      dispatch(increment());
    } else {
      dispatch(decrement());
    }
    setSelectValue(newValue);
  };
  return (
    <div className="App">
      <Select value={selectValue} onChange={onSelectAllChange}>
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default App;
