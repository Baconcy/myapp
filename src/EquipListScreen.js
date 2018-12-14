import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    Button,
    Alert,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    SectionList,
} from 'react-native';
import { DeviceEventEmitter } from 'react-native'; //事件通知
import {
    StackNavigator,
} from 'react-native';

// import NavigationService from './NavigationService';
import NavigationService from './NavigationService.js';

// import { ExpandableList } from "./ExpandableList";
import SideMenu from 'react-native-side-menu'; //导入侧边栏
import RunningScreen from "../src/equipDetail/RunningScreen";
import BasicScreen from "../src/equipDetail/BasicScreen";
import MaintenanceScreen from "../src/equipDetail/MaintenanceScreen";
import SearchScreen from "../src/equipDetail/SearchScreen";
import PageNaviScreen from "./PageNaviScreen"; //侧边栏
import SectionHeader from './SectionHeader';

export default class EquipListScreen extends Component {
    static navigationOptions = {
        title: '测试专用',
        // tabBarVisible: false, // 隐藏底部导航栏
        // header: null,  //隐藏顶部导航栏
        // headerTitle: '二维码',
        // headerRight: <View style={{ backgroundColor: '#5da8ff' }}><Button color='#5da8ff' title='' /></View>,
        // headerStyle: { backgroundColor: '#5da8ff' },  // 设置导航头部样式
        // headerTitleStyle: { // 设置导航头部标题样式
        //     flex: 1,
        //     // textAlign: 'center',
        //     fontSize: 17.5,
        // },
    }
    constructor(props) {
        super(props);
        this.state = {
            proj_id: 8,
            data: [],
            testTitle: '',
            searchText: '',
            currentPage: 0,
            isRefreshing: false,
            loaded: false,
            equip_name: '',
            projectData: [],
            equipData: [],
            equipsData: [],
            equipID: [],
            cellDataArray: [],
            newRoom: [],
            equip_room_id: [],
            //扫一扫
            viewAppear: false,
        };
        // 源数据
        // this.cellDatas = [
        //     {
        //         key: 1, title: '水泵房', show: true, data: [
        //             { key: '0', title: '水泵房' },
        //             { key: '1', title: '水泵房供水管道' },
        //             { key: '2', title: '水泵房集水井水泵' },
        //             { key: '3', title: '水泵房消防水池' },
        //             { key: '4', title: '水泵房生活水池' }
        //         ]
        //     },
        //     {
        //         key: 2, title: '电梯井', show: true, data: [
        //             { key: '0', title: '配电房变压器' },
        //             { key: '1', title: '楼顶消火栓' },
        //         ]
        //     },
        //     {
        //         key: 3, title: '测试专用', show: true, data: [
        //             { key: '0', title: '测试专用' },
        //         ]

        //     }
        // ];
        this.cellDatas = [];
    }

    // 组件加载完成
    componentDidMount() {
        const { ...nav } = this.props;
        console.log(...nav, 888)
        console.log(this.props, 777)
        // 刷新数据
        console.log("设备列表页面");
        // this.fetchRoomList();
        //接收监听
        this.subscription = DeviceEventEmitter.addListener('bacon', (message) => {
             console.log('bacon', message);
            this.setState({
                proj_id: message
            }, () => {
                console.log(this.state.proj_id, '设备列表页面');
                if(this.state.proj_id == ''){
                    this.fetchRoomList(8);
                } else {
                    this.fetchRoomList(this.state.proj_id);
                }
            })
        });
        // this.setState({
        //     proj_id: this.state.proj_id
        // }, () => {
        //     console.log(this.state.proj_id, '设备列表页面');
        //     this.fetchRoomList(this.state.proj_id);
        // })

        //  测试,在没有数据的情况下先显示这些
        // let newArray = JSON.parse(JSON.stringify(this.cellDatas));
        // this.setState({
        //     // cellDataArray: newArray
        //     cellDataArray: newRoom.map((item, i) => ({
        //         key: i + 1, //item.equip_room_id
        //         title: item.equip_room_name,
        //         show: true,
        //         data: item.equipments.map((subItem, i) => ({
        //             key: i + 1,
        //             title: subItem.equip_name,
        //             ...subItem
        //         }))
        //     }))
        // })
        // console.log(this.state.cellDataArray, 'componentDidMount中的cellDataArray')
        // console.log(this.show, 'this.show');
        // console.log(this.state.show, 'this.state.show');
        //启动定时器
        // let viewAppearCallBack = (event) => {
        //     this.setTimeout(() => {
        //         this.setState({
        //             viewAppear: true,
        //         })
        //     }, 255)

        // }
        // this._listeners = [
        //     this.props.navigator.navigationContext.addListener('didfocus', viewAppearCallBack)
        // ]
        // this.timer = setTimeout(
        //     () => this.setState({viewAppear: true}),
        //     250
        // );
    }

    //组件卸载
    componentWillUnmount() {
        //移除监听
        if (this.listener) {
            this.listener.remove();
        }
        
        //清除定时器
        // this._listeners && this._listeners.forEach(listener => listener.remove());
        // this.timer && clearTimeout(this.timer);
    };
    

    //列表项
    handlerSectionHeader = (info) => {
        if (info.section.show) {
            this.state.cellDataArray.map((item, index) => {
                if (item === info.section) {
                    item.show = !item.show;
                    item.data = [{ key: 'close' }];
                }
            });

        } else {
            this.cellDatas.map((item, index) => {
                if (item.key === info.section.key) {
                    let data = item.data;
                    this.state.cellDataArray.map((cellItem, i) => {
                        if (cellItem === info.section) {
                            cellItem.show = !cellItem.show;
                            cellItem.data = data;
                        }
                    });
                }
            });

        }
        let newDatas = JSON.parse(JSON.stringify(this.state.cellDataArray));
        this.setState({
            cellDataArray: newDatas
        })
        console.log(this.state.cellDataArray, 'state里面的cellDataArray');
    };
    //sectionList头部
    _ListHeaderComponent = () => {
        return (
            <View style={{ height: 12.5, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    .
                </Text>
            </View>
        );

    };
    //section之间的间隔
    _renderSectionSeparatorComponent = (info) => {
        return (
            <View style={{ height: 15.5, backgroundColor: '#FFFFFF' }}>

            </View>
        );
    };
    //cell之间的间隔
    _renderItemSeparatorComponent = (info) => {
        return (
            <View style={{ height: 1, backgroundColor: '#D3D3D3' }}>

            </View>
        );

    };
    //section头部
    _renderSectionHeader = (item) => {
        return (
            <SectionHeader
                info={item}
                handlerSectionHeader={this.handlerSectionHeader.bind(this)}
            />
        );
    };

    //cell
    _renderItem = (info) => {
        // console.log(info);
        //如果title为undefined （解决空数据section之间不显示问题）
        if (info.item.title == undefined) {
            return (<View>
                {/*<Text>一个设备也没有啦！</Text>*/}
            </View>);

        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('EquipInfo', {
                        item: info.item,
                    });
                }}>
                    <View style={{ height: 40, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 17.5, }}>
                        <Text style={{ color: '#696969', paddingHorizontal: 16.5, }} >
                            {info.item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
    };
    //根据项目id获取房间信息
    fetchRoomList = (proj_id) => {
        const URL = "http://116.62.186.91:8080/gywyext/moblieAdd/selectBaseInfoByProj.do";
        alert("开始获取房间数据");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'proj_id='+proj_id,
        })
            .then((response) => response.json())
            .then((roomData) => {
                const { equipment, room } = roomData;
                let newRoom = room.map((item, index) => {
                    // 筛选出符合需求的设备
                    let arr = equipment.filter((subItem, index) => {
                        if (item.equip_room_id == subItem.equip_room.equip_room_id) {
                            // console.log(item.equip_room_id, subItem.equip_room.equip_room_id)
                            return subItem
                        }
                    })
                    // console.log(`equipments.length ${arr.length}`)
                    return {
                        ...item,
                        //下面所属的设备信息
                        equipments: arr
                    }
                })

                // console.log(newRoom[0], newRoom[1], newRoom[2])
                this.setState({
                    roomData: this.state.roomData,
                    loaded: true,
                    cellDataArray: newRoom.map((item, i) => ({
                        key: i + 1, //item.equip_room_id
                        title: item.equip_room_name,
                        show: true,
                        data: item.equipments.map((subItem, i) => ({
                            key: i + 1,
                            title: subItem.equip_name,
                            ...subItem
                        }))
                    }))

                })
                // console.log(JSON.stringify(roomData.equipment))
                // console.log('roomData', roomData);
                console.log('newRoom', newRoom);
                console.log('cellDataArray', this.state.cellDataArray);
                // console.log('EquipAndRoomData', EquipAndRoomData);
            })
            .catch((error) => {
                console.log('error', error);
            })
            .done();
    }


    render() {
        
        
        // const { item } = this.props.screenProps;// 获取到参数
        // console.log(this, '测试this');
        // console.log(this.state.cellDataArray, '987');
        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', backgroundColor: '#5da8ff', width: Dimensions.get('window').width, height: 55 }}>
                    <View style={{ width: 40, height: 40, marginRight: 100, paddingVertical: 7.5 }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Drawer') }}>
                            <Image
                                source={require('../image/leftSide.png')}
                                style={{ width: 40, height: 40 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 15.5 }}>
                        <Text style={{ fontSize: 17.5 }}>设备信息</Text>
                    </View >
                    <View style={{ width: 40, height: 40, marginLeft: 105, paddingVertical: 15.5 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Scan');
                            }}>
                            <Image
                                source={require('../image/scan.png')}
                                style={{ width: 25, height: 25 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchbar}>
                    {/*设置手机状态栏的显示样式*/}
                    {/*<StatusBar
                        backgroundColor={'blue'}
                        barStyle={'default'}
                        networkActivityIndicatorVisible={true}>
                    </StatusBar>*/}
                    <TextInput
                        style={styles.input}
                        placeholder='输入设备型号或名称'
                        onChangeText={(text) => {
                            this.setState({ equip_id: text });
                        }}
                    >
                    </TextInput>
                    <Button
                        style={styles.button}
                        title='搜索'
                        onPress={() => { this.props.navigation.navigate('Search') }}
                    />
                </View>
                <View style={styles.container}>
                    <SectionList
                        ListHeaderComponent={this._ListHeaderComponent}
                        renderSectionHeader={this._renderSectionHeader}
                        SectionSeparatorComponent={this._renderSectionSeparatorComponent}
                        ItemSeparatorComponent={this._renderItemSeparatorComponent}
                        renderItem={this._renderItem}
                        sections={this.state.cellDataArray}
                        extraData={this.state}
                    />
                </View>
            </View>
        );
    };
    // onPress={() => {
    //                             NavigationService.navigate('ScanScreen');
    //                         }}

    //sections={this.state.cellDataArray}
    //onChangeText={this._onChangeText.bind(this)}


    //keyExtractor = (item, index) => item.id;
    // 为给定的item生成一个不重复的key,若不指定则以item.key为key值.若item.key不存在,则用数组下标index
    keyExtractor = (item, index) => index

    //分割线
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: 'lightgray' }}>
        </View>;
    }
    //刷新函数
    _onRefresh = () => {
        this.setState({ isRefreshing: true }); //状态为正在刷新
        setTimeout(() => {//可增加对设备的更新
            this.setState({ isRefreshing: false });
        }, 1000);
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbar: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        flex: 2,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
    },
    button: {
        flex: 2,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
        color: '#F5FCFF',
    },
    QRcode: {
        height: 100,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    equips: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    row: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    equipImg: {
        width: 40,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    equipText: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    equipTitle: {
        flex: 3,
        fontSize: 16,
    },
    equipSubTitle: {
        flex: 2,
        fontSize: 14,
        color: 'gray',
    },
    divider: {
        height: 1,
        width: Dimensions.get('window').width,
        marginLeft: 5,
        backgroundColor: 'lightgray',
    },
    fetchTest: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    list: {
        flex: 1,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    left: {
        flex: 1,
        marginLeft: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    groupItem: {
        borderBottomColor: '#DDD',
        borderBottomWidth: 1
    },
    headContainer: {
        paddingHorizontal: 15,
        height: 55,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headChosenContainer: {
        backgroundColor: '#CF5942'
    },
    headTitleText: {
        flex: 1,
        color: '#333',
        fontWeight: 'bold'
    },
    touchArea: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItemContainer: {
        height: 30,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: '#D76852'
    },
    listItemText: {
        color: '#FFF'
    }
});