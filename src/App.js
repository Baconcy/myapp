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
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
// StackNavigator可实现页面间的跳转；TabNavigator切换组件，实现同一页面上不同界面的切换
import {
    StackNavigator,
    TabBarTop,
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator
} from "react-navigation";

import NavigationService from './NavigationService'; //导航页面，用来调度用户定义的导航操作模块

import SideMenu from 'react-native-side-menu';
import PageNaviScreen from "./PageNaviScreen"; //侧边栏
import EquipListScreen from "./EquipListScreen";
import AlarmScreen from "./AlarmScreen";
import MyScreen from "./MyScreen";
import EquipInfoScreen from "../src/equipDetail/EquipInfoScreen";
import BasicScreen from "../src/equipDetail/BasicScreen";
import RunningScreen from "../src/equipDetail/RunningScreen";
import MaintenanceScreen from "../src/equipDetail/MaintenanceScreen";

import DrawerScreen from "./DrawerScreen"; //自定义抽屉组件
import ScanScreen from "./ScanScreen";

 class App extends Component {

    render() {
        return (
            <TopLevelNavigator
                
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }
}

// 侧边栏
const PageNavi = createDrawerNavigator({ //两个参数，分别为RouteConfigs和DrawerNavigatorConfig
    PageNavi: {
        screen: PageNaviScreen,  //承载抽屉栏的页面
    },
    

},
    {
        // initialRouteName: 'PageNavi',
        drawerWidth: (Dimensions.get('window').width * 3) / 4, //抽屉栏宽度
        drawerPosition: 'left',
        swipeEnabled: true,
        contentComponent: props => <DrawerScreen {...props} />, //自定义抽屉组件，会覆盖之前左侧栏的内容，怎么把props给进去？？？


    });

// const StackRouteConfigs = {
//     Drawer: { screen: Drawer }, //侧边栏
//     PageNavi: { screen: PageNaviScreen },
//     // EquipList: {screen: EquipListScreen},
//     // Alarm: { screen: AlarmScreen },
//     // My: { screen: MyScreen }


// };
// 表示导航器的配置，包括导航器的初始页面、各个页面之间导航的动画、页面的配置选项等
// const StackNavigatorConfigs = {
//     initialRouteName: 'Drawer',
//     //动态修改当前状态栏的标题
//     navigationOptions: ({navigation}) => ({
//         header: null, //隐藏抽屉栏对应的头部导航栏
//         headerTitle:'设备信息',
//         headerStyle: { backgroundColor: '#5da8ff' },  // 设置导航头部样式
//         headerTitleStyle: {
//             flex: 1,
//             textAlign: 'center',
//             color: '#333333',
//         },  // 设置导航头部标题样式
//     })
// };

// StackNavigator 导航器组件，实现界面跳转
export default TopLevelNavigator = createStackNavigator({
    PageNavi: {
        screen: PageNavi
    },
    EquipList: {
        screen: EquipListScreen
    },
    Alarm: {
        screen: AlarmScreen
    },
    My: {
        screen: MyScreen
    },
    EquipInfo: {
        screen: EquipInfoScreen
    },
    Scan: {
        screen: ScanScreen
    },
    Basic: {
        screen: BasicScreen
    },
    Running: {
        screen: RunningScreen
    },
    Maintenance: {
        screen: MaintenanceScreen
    }

}, {
        headerMode: 'none', // 去掉标题头，这里使用了自定义的标题栏
    });