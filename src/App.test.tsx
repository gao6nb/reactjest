import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from './app/store';
import App from './App';
let store = createStore();
beforeEach(() => {
  // 在每个用例开始前，将store设置成完全初始的状态
  // 这里是简单粗暴的重新创建
  store = createStore();
});

test('select `Increase` option', () => {
  render(
    // 在调用render创建测试视图的时候，一定要记得提供store
    <Provider store={store}>
      <App />
    </Provider>
  );
  // 选择role=button
  const selectTrigger = screen.getByRole('button');
  // 点击下拉框，弹出选项
  // MUI的Select组件触发弹出下拉选项的事件是mousedown，从MUI代码仓库里的测试用例可以知道
  fireEvent.mouseDown(selectTrigger);
  // 根据文本找到下拉选项
  const increaseOption = screen.getByText('Increase');
  // 点击选项
  fireEvent.click(increaseOption);
  // 断言store的counter.value已经增加
  expect(store.getState().counter.value).toBe(1);
});

test('select `Decrease` option', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const selectTrigger = screen.getByRole('button');
  fireEvent.mouseDown(selectTrigger);
  const increaseOption = screen.getByText('Decrease');
  fireEvent.click(increaseOption);
  // decrease的情况同理，覆盖App.tsx第16行的else分支
  expect(store.getState().counter.value).toBe(-1);
});
