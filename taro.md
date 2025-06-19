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
  
## 页面传参
1. 拼接式传参 ===》传递少量简单参数（字符串、数字）
    Taro.navigateTo({
      url: `/pages/detail/index?id=123&type=test` 
    })
  接收：
    import { useRouter } from '@tarojs/taro'
    const router = useRouter()

2. 预加载传参（大数据量）===》传递对象、数组等复杂数据
  跳转前预加载数据：
    const complexData = { list: [1,2,3], user: { name: 'Taro' } }
    Taro.preload(complexData)  // 存储到页面实例 :ml-citation{ref="1" data="citationList"}
    Taro.navigateTo({ url: '/pages/detail/index' })
  目标页面获取：
    const preloadData = Taro.getCurrentInstance().preloadData

4. EventChannel 通信（双向传参）===》适用场景‌：需要页面间双向通信（如 A→B 传参 + B→A 回传结果）
  A 页面跳转并建立通道
    Taro.navigateTo({
      url: '/pages/B/index',
      events: {
        // 监听 B 页面回传事件
        onSuccess: (data) => console.log('回传数据:', data) 
      },
      success(res) {
        // 向 B 页面发送数据（仅微信小程序）
        res.eventChannel?.emit('initData', { msg: '来自A的数据' }) :ml-citation{ref="6" data="citationList"}
      }
    })
  B页面获取参数:
    export default function B() {
      const eventChannel = Taro.getCurrentInstance().page?.getOpenerEventChannel()
      eventChannel?.on('initData', (data) => {
        console.log('接收数据:', data) // { msg: '来自A的数据' }
        // 回传数据给 A
        eventChannel.emit('onSuccess', { status: 200 }) 
      }) :ml-citation{ref="6" data="citationList"}
    }

## globalData:全局状态管理（跨页面共享）
全局 app.ts:
  class GlobalStore {
    data: any = null
  }
  Taro.globalData = new GlobalStore()
页面存储:
  Taro.globalData.data = { list: [...] } 
  Taro.navigateTo({ url: '/pages/B/index' })
页面读取
const globalData = Taro.getApp().globalData.data





















