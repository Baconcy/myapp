import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  StackNavigator, 
  TabBarTop, 
  TabNavigator
} from "react-navigation";

// import NavigationService from '../../NavigationService.js';

import BasicScreen from "../equipDetail/BasicScreen";
import RunningScreen from "../equipDetail/RunningScreen";
import MaintenanceScreen from "../equipDetail/MaintenanceScreen";
import TabBarItem from "../../src/TabBarItem";


export default class EquipInfoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            who: '',
            param: {},
        }
    }
    render() {
        //这句话代表接受从父组件传过来的参数，不能缺少
        const { item, } = this.props.navigation.state.params;
        console.log(item, 1234)
        // console.log(equip_id, 12345)

        return (
                <Tab 
                    screenProps = {{
                        item,
                    }}
                />
        );
    }

    // 组件加载完成
    componentDidMount() {
        console.log("component did load");
    }

}

 // 为导航器配置页面路由,让导航器知道需要导航的路由对应的页面
 const RootRouteConfigs = {  
    Basic: {  // 路由名称
        screen: BasicScreen,  
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '基本信息',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('../../image/home_fill_light.png')}
                    selectedImage={require('../../image/home.png')}
                />
            ),
        }),
    },
    Running: {
        screen: RunningScreen,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '运行信息',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('../../image/running_fill.png')}
                    selectedImage={require('../../image/running.png')}
                />
            ),
        }),
    },
    Maintenance: {
        screen: MaintenanceScreen,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '维保信息',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('../../image/maintain_fill.png')}
                    selectedImage={require('../../image/maintain.png')}
                />
            ),
        }),
    },
};

const TabNavigatorConfigs = {
    initialRouteName: 'Basic',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'bottom', // 设置选项卡的位置，在顶部或是底部，有'top'与'bottom'可选
    lazy: true,  // 是否懒加载页面
    tabBarOptions: {
        activeTintColor: '#000000', // 文字和图片选中颜色
        inactiveTintColor: '#FFE4E1',
        showIcon: true,
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示的线
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
    } 
};
//页面切换（页面及其样式两个参数）
const Tab = TabNavigator(RootRouteConfigs, TabNavigatorConfigs);
// const StackRouteConfigs = {
//     Tab: {screen: Tab},
//     Basic: { screen: BasicScreen },
//     Running: { screen: RunningScreen },
//     Maintenance: { screen: MaintenanceScreen }

// };
// 表示导航器的配置，包括导航器的初始页面、各个页面之间导航的动画、页面的配置选项等
 /*const StackNavigatorConfigs = {
    initialRouteName: 'Tab',
    //动态修改当前状态栏的标题 
    navigationOptions: ({navigation}) => ({
        headerTitle: '设备信息',
        headerLeft:
        <TouchableOpacity style={{ paddingHorizontal: 4.5 }} onPress={()=>{this.props.navigation.goback()}}>
            <Image
                source={require('../../image/goback.png')}
                style={{ width: 40, height: 40 }}
            />
        </TouchableOpacity>,
        // header: null,
        headerStyle: {backgroundColor: '#5da8ff'},  // 设置导航头部样式
    //     headerTitleStyle: {
    //         flex:1,
    //         textAlign:'center',
    //         color: '#333333'},  // 设置导航头部标题样式
    })
};*/
// StackNavigator 导航器组件，实现界面跳转
// const Navigator = StackNavigator({
//     Tab: {
//         screen: Tab
//     },
//     Basic: { 
//         screen: BasicScreen 
//     },
//     Running: { 
//         screen: RunningScreen 
//     },
//     Maintenance: { 
//         screen: MaintenanceScreen 
//     }
// }, {
//         headerMode: 'none',
// });

    