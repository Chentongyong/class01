# taro项目开发
## 函数用法 ===> export default function Index()
1. 特点：函数组件无 constructor；状态初始化直接用 useState；useEffect 合并了多个生命周期方法的功能；错误处理需配合 ErrorBoundary 组件实现

2. 兼容小程序生命周期（如 onLoad、onShow）完整例子：
import React, { useEffect, useState } from 'react';
import { useDidShow } from '@tarojs/taro';
export default function Index() {
  const [data, setData] = useState(null);
  // 挂载+卸载
  useEffect(() => {
    fetchData().then(res => setData(res));
    return () => console.log('组件卸载');
  }, []);
  // 更新监听
  useEffect(() => {
    if (data) console.log('数据已更新:', data);
  }, [data]);
  // Taro页面显示钩子
  useDidShow(() => {
    console.log('页面进入前台');
  });
  return <View>{data}</View>;
}


### 挂载阶段: useEffect对应componentDidMount在组件首次渲染后执行
  useEffect(() => {
    console.log('组件挂载完成');
    return () => console.log('组件卸载'); // 卸载逻辑
  }, []); // 空依赖数组表示仅执行一次

### 挂载阶段: 监听特定状态或 props 变化时触发，类似 componentDidUpdate
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('count 更新:', count);
  }, [count]); // 依赖项变化时触发
### 卸载阶段: 通过 useEffect 的清理函数模拟 componentWillUnmount
  useEffect(() => {
    const timer = setInterval(() => {}, 1000);
    return () => clearInterval(timer); // 清理副作用
  }, []);























