import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import SelectDialog from 'react-native-select-dialog';
import { DeviceEventEmitter } from 'react-native'; //事件通知
// import { createStackNavigator } from 'react-navigation';

// import BasicScreen from "../src/equipDetail/BasicScreen";
// import MaintenanceScreen from "../src/equipDetail/MaintenanceScreen";


export default class AlarmScreen extends Component {
    static navigationOptions = {
        headerTitle: '二维码',
        headerRight: <View style={{ backgroundColor: '#5da8ff' }}><Button color='#5da8ff' title='' /></View>,
        headerStyle: { backgroundColor: '#5da8ff' },  // 设置导航头部样式
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            fontSize: 17.5,
        },  // 设置导航头部标题样式
    }
    // static navigationOptions = ({ navigation, screenProps }) => {
    //     return ({
    //         header: null,
    //     })
    // }
    constructor(props) {
        super(props);
        this.state = {
            roomData: [],
            newRoom: [],
            equipData: [],
            //自定义弹窗的字段
            initTxt: '请选择房间',
            initlistTxt: '请选择设备',
            mess: '',
            listtxt: '',
            index: null,
            valChange: false,
            vallistChange: false,
            cellDataArray: [
                {
                    txt: '',
                    id: ''
                },
            ],
            onlyRoom: [
                {
                    txt: '',
                    id: ''
                },
            ],
            newRoomData: [
                {
                    txt: '',
                    id: ''
                },
            ],
            newEquipData: [
                {
                    name: '',
                    id: ''
                },
            ],
            data: [
                {
                    name: '',
                    id: ''
                },
            ],

        }
        // this.dataList = [
        //     { name: '小红', id: 'option1', age: 13 },
        //     { name: '小明', id: 'option2', age: 14 },
        //     { name: '小林', id: 'option3', age: 15 },
        //     { name: '小李', id: 'option4', age: 16 },
        //     { name: '小赵', id: 'option5', age: 17 },
        // ];
    }
    componentDidMount() {
        // 刷新数据
        console.log("设备报警信息页面");
        // this.fetchRoomList();
        // this.fetchEquipmentParam();
        this.subscription = DeviceEventEmitter.addListener('bacon', (message) => {
             console.log('bacon', message);
            this.setState({
                proj_id: message
            }, () => {
                console.log(this.state.proj_id, '报警页面');
                this.fetchEquipmentParam(this.state.proj_id);
            })
        });

    }
    //组件卸载
    componentWillUnmount() {
        //移除监听
        if (this.listener) {
            this.listener.remove();
        }
    }
    changBank = (item, index) => {
        // console.log(item.data, 'bank测试')
        const data = item.data
        this.setState({ 
            mess: item.txt, 
            id: item.equip_room_id, 
            index: item.id, 
            data: data, 
            valChange: true 
        })
    }
    changList(item, index) {
        console.log(this.state.data, 123)
        console.log(item.equip_name, 456)
        console.log(item.equip_id, 789)
        this.setState({
            listtxt: item.equip_name,
            listindex: item.equip_id,
            name: item.equip_name,
            id: item.equip_id,
            vallistChange: true
        })
    }
    show = () => {
        this.refs.bankName.show()
    }
    showList = () => {
        this.refs.showList.show()
    }
    // //根据项目id获取房间信息
    // fetchRoomList = () => {
    //     const URL = "http://116.62.186.91:8080/gywyext/moblieAdd/selectBaseInfoByProj.do";
    //     alert("开始获取房间数据");
    //     fetch(URL, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body: 'proj_id=8',
    //     })
    //         .then((response) => response.json())
    //         .then((roomData) => {
    //             const { equipment, room } = roomData;
    //             let newRoom = room.map((item, index) => {
    //                 // 筛选出符合需求的设备
    //                 let arr = equipment.filter((subItem, index) => {
    //                     if (item.equip_room_id == subItem.equip_room.equip_room_id) {
    //                         // console.log(item.equip_room_id, subItem.equip_room.equip_room_id)
    //                         return subItem
    //                     }
    //                 })
    //                 // console.log(`equipments.length ${arr.length}`)
    //                 return {
    //                     ...item,
    //                     //下面所属的设备信息
    //                     equipments: arr
    //                 }
    //             })
    //             const onlyRoom = newRoom.map((item, index) => ({
    //                 txt: item.equip_room_name,
    //                 id: item.equip_room_id,
    //                 ...item,
    //             }))

    //             // console.log(newRoom[0], newRoom[1], newRoom[2])
    //             this.setState({
    //                 roomData: this.state.roomData,
    //                 loaded: true,
    //                 onlyRoom: onlyRoom,
    //                 // newRoom,
    //                 // cellDataArray: newRoom.map((item, i) => ({
    //                 //     // key: i + 1, //item.equip_room_id
    //                 //     txt: item.equip_room_name,
    //                 //     id:  item.equip_room_id,
    //                 //     // data: item.equipments.map((subItem, i) => ({
    //                 //     //     key: i + 1,
    //                 //     //     title: subItem.equip_name,
    //                 //     //     ...subItem
    //                 //     // }))
    //                 // }))

    //             })
    //             // console.log(JSON.stringify(roomData.equipment))
    //             // console.log('roomData', roomData);
    //             // console.log('newRoom', newRoom);
    //             // console.log('cellDataArray', this.state.cellDataArray);
    //             console.log('onlyRoom', this.state.onlyRoom);
    //             // console.log('EquipAndRoomData', EquipAndRoomData);
    //         })
    //         .catch((error) => {
    //             console.log('error', error);
    //         })
    //         .done();
    // }
    fetchEquipmentParam = (proj_id) => {
        const URL = "http://116.62.186.91:8080/gywyext/moblieAdd/selectBaseInfoByProj.do";
        console.log('获取房间和设备参数');
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'proj_id=8',

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
                const newRoomData = newRoom.map((item, index) => ({
                    txt: item.equip_room_name,
                    id: item.equip_room_id,
                    // ...item,
                    data: item.equipments.map((subItem, i) => ({
                        // key: i + 1,
                        name: subItem.equip_name,
                        id: subItem.equip_id,
                        ...subItem
                    }))
                }))
                const newEquipData = newRoom.map((item, index) => ({
                    data: item.equipments.map((subItem, i) => ({
                        name: subItem.equip_name,
                        id: subItem.equip_id,
                        ...item,
                    }))

                }))
                this.setState({
                    newRoomData: newRoomData,
                    newEquipData: newEquipData,
                })
                console.log('newRoomData', this.state.newRoomData);
                console.log('newEquipData', this.state.newEquipData);
            })
            .catch((error) => {
                console.log('error', error);
            })
            .done();
    }
    //添加设备报警信息
    addEquipAlarmInfo(equip_id, alarmLog_info, alarmLog_memo) {
        console.log(equip_id, alarmLog_info, alarmLog_memo, 'ABC')
        const URL = "http://116.62.186.91:8080/gywyext/moblieAdd/addAlarm.do";
        // alert(equip_para_id + "---" + equip_param, "录入设备参数");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "equip_id="+equip_id +"&alarmLog_info="+alarmLog_info +"&alarmLog_memo="+alarmLog_memo,
            // body: "equip_id=1&alarmLog_info=1&alarmLog_memo=1",
        })
            .then((response) => response.json())
            .then((result, done) => {
                console.log('result', result);
                if (result == 'ok') {
                    alert('添加报警信息成功！');
                } else {
                    alert('添加报警信息失败！');
                }
            })
    }

    render() {
        // const {navigate} = this.props.navigation;
        const listVal = this.state.valChange ? this.state.mess : this.state.initTxt
        const listVal2 = this.state.vallistChange ? this.state.listtxt : this.state.initlistTxt
        // this.setState({id: rowData.equip_id })
        console.log(this.state.id, this.state.alarmLog_info, this.state.alarmLog_memo, 'abc')
        return (
            <View style={{ flex: 1, backgroundColor: '#F5FCFF', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', backgroundColor: '#5da8ff', width: Dimensions.get('window').width, height: 55 }}>
                    <View style={{ width: 40, height: 40, marginRight: 100, paddingVertical: 7.5 }}>

                    </View>
                    <View style={{ paddingVertical: 15.5 }}>
                        <Text style={{ fontSize: 17.5 }}>警报信息</Text>
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
                <View style={{ flexDirection: 'row', margin: 10, }} >
                    <View style={{ marginTop: 12.5 }}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: '#dfdfdf',
                                borderRadius: 3, height: 38.5, width: 290, marginHorizontal: 17.5, padding: 8.5
                            }}
                            onPress={this.show.bind(this)}
                            underlayColor="transparent">
                            <View style={[styles.flexRow, styles.flex1, styles.Acenter]}>
                                <Text style={[styles.flex1, { fontSize: 14, paddingLeft: 10 }]}>
                                    请选择房间：{listVal}
                                </Text>
                                {/*<Image style={{ width: 18, height: 18, }} source={require('../image/Arrow.png')} />*/}
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*<View style={{ paddingHorizontal: 36.5 }}>
                        <Text >你选择的银行是：
			                {this.state.mess}
                        </Text>
                        <Text>它的id值为：{this.state.index}</Text>
                    </View>*/}
                    <SelectDialog
                        ref="bankName"
                        titles={'请选择房间'}
                        valueChange={this.changBank.bind(this)}
                        datas={this.state.newRoomData}
                        animateType={'fade'}
                    />
                </View>
                <View style={{ position: 'relative', margin: 10 }}>
                    <TouchableOpacity style={{
                        borderWidth: 1,
                        borderColor: '#dfdfdf',
                        borderRadius: 3, height: 38.5, width: 290, marginHorizontal: 17.5, padding: 8.5
                    }}
                        onPress={this.showList.bind(this)}
                        underlayColor="transparent">
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={[styles.flex1, { fontSize: 14, paddingLeft: 10 }]}>
                                请选择设备：{listVal2}
                            </Text>
                            {/*<Image style={{ width: 18, height: 18 }} source={require('../image/Arrow.png')} />*/}
                        </View>
                    </TouchableOpacity>
                    <SelectDialog
                        ref="showList"
                        titles={'请选择设备'}
                        valueChange={this.changList.bind(this)}
                        datas={this.state.data}
                        animateType={'fade'}
                        renderRow={this.defineList.bind(this)}
                    />
                    {/*positionStyle={{ backgroundColor: '#ff6600' }}
                        renderRow={this.defineList.bind(this)}
                        innersWidth={150}
                        innersHeight={200}*/}
                </View>
                <View style={{ marginHorizontal: 28.5, }}>
                    <Text style={{ fontSize: 14, color: '#696969', marginLeft: 18.5, }}>请输入报警信息:</Text>
                    <TextInput
                        placeholder='请输入报警信息'
                        placeholderTextColor={'#BBBBBB'}
                        underlineColorAndroid={'transparent'}
                        multiline
                        style={{
                            borderWidth: 1, borderColor: '#dfdfdf', borderRadius: 3, fontSize: 14, width: 288, height: 120,
                        }}
                        onChangeText={(text) => {
                            this.setState({ alarmLog_info: text })
                        }}
                    />
                </View>
                <View style={{ marginHorizontal: 28.5, }}>
                    <Text style={{ fontSize: 14, color: '#696969', marginLeft: 18.5, }}>请输入备注:</Text>
                    <TextInput
                        placeholder={'请输入备注'}
                        placeholderTextColor={'#BBBBBB'}
                        underlineColorAndroid={'transparent'}
                        style={{
                            borderWidth: 1, borderColor: '#dfdfdf', borderRadius: 3, fontSize: 14, width: 288, height: 120,
                        }}
                        onChangeText={(text) => {
                            this.setState({ alarmLog_memo: text })
                        }}
                    />
                </View>
                <View style={{ margin: 10 }}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        padding: 8.5,
                        borderColor: '#1E90FF',
                        borderWidth: 1,
                        borderRadius: 3,
                        width: 285,
                        backgroundColor: '#1E90FF',
                    }}
                        onPress={() => this.addEquipAlarmInfo(this.state.id, this.state.alarmLog_info, this.state.alarmLog_memo)}
                    >
                        <Text style={{ fontSize: 15.5 }}>确认提交</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
    //设备列表每项的显示方式
    defineList(rowData, rowID, highlighted) {
        // let icon = highlighted ? require('./images/selected.png') : require('./images/select.png');
        let evenRow = rowID % 2;
        // this.setState({id: rowData.equip_id })
        return (
            <View style={[styles.flexRow,
            {
                backgroundColor: evenRow ? '#dfdfdf' : 'white',
                alignItems: 'center', height: 36, paddingHorizontal:20
            }]}>
                {/*<Image style={{ width: 18, height: 18, marginLeft: 10, marginRight: 10 }}
					mode='stretch'
                    source={icon}
				/>*/}
                <Text style={[styles.listTxt,highlighted && { color: 'mediumaquamarine' }]}>
                    {rowData.equip_name}--{rowData.equip_id}
                </Text>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    area: {
        // justifyContent: 'center',
        // alignItems: 'center',
        width: 150,
        height: 17,
        // backgroundColor: '#F5FCFF',
        marginTop: 30,
        // marginRight: 150,
        marginLeft: 30,
        // placeholderTextColor
    },
    equip: {
        width: 150,
        height: 17,
        marginTop: 18,
        marginRight: 125,
        marginLeft: 30,
    },
    button: {
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0099FF',
        padding: 10,
        marginTop: 13,
        marginLeft: 135,
        width: 100,
        height: 38,
    },
    //自定义弹框样式
    listTxt: {
        fontSize: 14,
        color: '#666666',
    },
    detailContainView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    messWidth: {
        width: 80,
        textAlign: 'right',
    },
    defaultWidth: {
        width: 150
    },
    // defaultStyle: {
    //     backgroundColor: '#ffffff',
    //     borderWidth: 1,
    //     borderColor: '#DFDFDF',
    //     padding: 0,
    //     paddingLeft: 5,
    //     paddingRight: 5,
    //     borderRadius: 3,
    // },
    boxCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    investBtn: {
        width: 90,
        marginLeft: 10,
        height: 30,
        justifyContent: 'center',
    },
    Jcenter: {
        justifyContent: 'center',
    },
    Acenter: {
        alignItems: 'center',
    },
    Textcenter: {
        textAlign: 'center',
    },
    TextCenterVer: {
        textAlignVertical: 'center',
    },
    dropdownStyle: {
        width: 148,
        top: 40,
    },
    style: {
        width: 150,
        height: 40,
        justifyContent: 'center',
    },
    TextInputContainer: {
        backgroundColor: 'white'
    },
    yellow: {
        color: '#f8cb43',
    },
    flexRow: {

        flexDirection: 'row',
    },
    flexVer: {
        flexDirection: 'column',
    },
    flex1: {
        flex: 1,
    },
    colorRed: {
        color: '#b40e12',
    },
    colorYellow: {
        color: '#f8cb43',
    },
    color999: {
        color: '#999999',
    },
    colorWhite: {
        color: '#ffffff',
    },
    colorBlack: {
        color: '#141414',
    },
    borderGray: {
        borderWidth: 1,
        borderColor: '#dfdfdf'
    },
    borderRadius3: {
        borderRadius: 3
    }

})