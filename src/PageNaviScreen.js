/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    //   TabBarItem,
} from 'react-native';
// StackNavigator可实现页面间的跳转；TabNavigator切换组件，实现同一页面上不同界面的切换
import {
    StackNavigator,
    TabBarTop,
    TabNavigator,
    DrawerNavigator,
} from "react-navigation";
import SideMenu from 'react-native-side-menu';
//引入组件（一个页面即为一个组件,quipScreen表示EquipScreen.js。./表示当前页面，不可删除）
import EquipListScreen from "./EquipListScreen";
import AlarmScreen from "./AlarmScreen";
import MyScreen from "./MyScreen";
import TabBarItem from "./TabBarItem"; //图标组件
import ScanScreen from "./ScanScreen";

import BasicScreen from "../src/equipDetail/BasicScreen";
import RunningScreen from "../src/equipDetail/RunningScreen";
import MaintenanceScreen from "../src/equipDetail/MaintenanceScreen";
import EquipInfoScreen from "../src/equipDetail/EquipInfoScreen";
import SearchScreen from "../src/equipDetail/SearchScreen";




export default class PageNaviScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
        };
    }
    componentDidMount() {
        console.log('this is PageNaviScreen');
        console.log(this.props,666)

    }
    render() {
        //接收参数
        // const { item } = this.props.navigation.state.params;
        console.log(this.props, 666)
        return (
            <Tab
                nav={this.props.navigation}
                //screenProps={{
                    //   item
                    // nav
                //}}
            />
        );
    }
}


// 为导航器配置页面路由,让导航器知道需要导航的路由对应的页面
const Tab = TabNavigator(
    {
        EquipList: {  // 路由名称
            screen: EquipListScreen,  // 对应路由的页面
            navigationOptions: ({navigation}) => ({ // 指定路由页面的配置选项
                tabBarLabel: '设备首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../image/home_fill_light.png')}
                        selectedImage={require('../image/home.png')}
                    />
                ),
            }),
        },
        Alarm: {
            screen: AlarmScreen,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '警报信息',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../image/alarm_fill.png')}
                        selectedImage={require('../image/alarm.png')}
                    />
                ),
            }),
        },
        My: {
            screen: MyScreen,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '公司信息',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../image/comp_fill.png')}
                        selectedImage={require('../image/comp.png')}
                    />
                ),
            }),
        },
    }, {
        initialRouteName: 'EquipList',  // 初始显示的Tab对应的页面路由名称
        // tabBarComponent: TabBarTop, // Tab选项卡组件，有TabBarBottom和TabBarTop 两个值在iOS中默认为 TabBarBottom，在Android中默认为 TabBarTop
        tabBarPosition: 'bottom', // 设置选项卡的位置，在顶部或是底部，有'top'与'bottom'可选
        lazy: true,  // 是否懒加载页面
        tabBarOptions: {
            activeTintColor: '#000000', // 文字和图片选中颜色
            inactiveTintColor: '#FFE4E1',
            showIcon: true,
            indicatorStyle: { height: 0 }, // android 中TabBar下面会显示的线
        }
    })

// const TabNavigatorConfigs = { //DrawerNavigatorConfigs
//     initialRouteName: 'EquipList',  // 初始显示的Tab对应的页面路由名称
//     // tabBarComponent: TabBarTop, // Tab选项卡组件，有TabBarBottom和TabBarTop 两个值在iOS中默认为 TabBarBottom，在Android中默认为 TabBarTop
//     tabBarPosition: 'bottom', // 设置选项卡的位置，在顶部或是底部，有'top'与'bottom'可选
//     lazy: true,  // 是否懒加载页面
//     tabBarOptions: {
//         activeTintColor: '#000000', // 文字和图片选中颜色
//         inactiveTintColor: '#FFE4E1',
//         showIcon: true,
//         indicatorStyle: { height: 0 }, // android 中TabBar下面会显示的线
//     }
// };
//页面切换（页面及其样式两个参数） Tab
// const Tab = TabNavigator(RootRouteConfigs, TabNavigatorConfigs);
// const Drawer = DrawerNavigator(DrawerRouteConfigs, DrawerNavigatorConfigs);

// const StackRouteConfigs = {
//     Tab: { screen: Tab },
//     EquipInfo: { screen: EquipInfoScreen },
//     Scan: { screen: ScanScreen },
//     // EquipList: {screen: EquipListScreen},
//     // Alarm: { screen: AlarmScreen },
//     // My: { screen: MyScreen },
// };
// 表示导航器的配置，包括导航器的初始页面、各个页面之间导航的动画、页面的配置选项等
// const StackNavigatorConfigs = {
    // initialRouteName: 'Tab',
    //动态修改当前状态栏的标题
    // navigationOptions: ({navigation}) => ({
    //     // tabBarVisible: false, // 隐藏底部导航栏
    //     // header: null,  //隐藏顶部导航栏
    // //     // title: params ? params.title :'设备',

    //     headerTitle: "设备信息",
        // header: null,
    //     /*headerLeft:
    //     <TouchableOpacity style={{ paddingHorizontal: 4.5 }} onPress={()=>{this.props.navigation.navigate('DrawerOpen')}}>
    //         <Image
    //             source={require('../image/leftSide.png')}
    //             style={{ width: 40, height: 40 }}
    //         />
    //     </TouchableOpacity>,
    //     headerRight:
    //     <TouchableOpacity
    //         onPress={() => {
    //             this.props.navigation.navigate('Scan');
    //         }}>
    //         <Image
    //             source={require('../image/scan.png')}
    //             style={{ width: 25, height: 25 }}
    //         />
    //     </TouchableOpacity>,*/
    //     headerStyle: { backgroundColor: '#5da8ff' },  // 设置导航头部样式
    //     headerTitleStyle: {
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         alignSelf: 'center',
    //         textAlign: 'center',
    //         color: '#333333',
    //         fontSize: 17.5
    //     },  // 设置导航头部标题样式
    // })
// };

// StackNavigator 导航器组件，实现界面跳转
// const Navigator = StackNavigator({
//     Tab: { 
//         screen: Tab 
//     },
//     EquipInfo: { 
//         screen: EquipInfoScreen 
//     },
//     Scan: { 
//         screen: ScanScreen 
//     },
// }, 
// {
//     headerMode: 'none',
// });