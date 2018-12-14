import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    DeviceEventEmitter,
    Button,
    Dimensions
} from 'react-native';
// import EquipListScreen from './src/EquipListScreen';
export default class BasicScreen extends Component {
    //配置页面导航选项
    static navigationOptions = {
        title: '二维码',
        headerTitle: '二维码',
        tabBarLable: '二维码',
        headerRight: (<View style={{ backgroundColor: '#5da8ff' }}><Button color='#5da8ff' title='' /></View>),
        headerStyle: { backgroundColor: '#5da8ff' },  // 设置导航头部样式
        headerTitleStyle: { // 设置导航头部标题样式
            flex: 1,
            textAlign: 'center',
            fontSize: 17.5,
        },
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: '二维码',
        headerStyle: { backgroundColor: '#5da8ff' },
        headerTitleStyle: { alignSelf: 'center' },

    });

    static defaultProps = {//设置默认值
        // equip_name: " ",
        // equip_no: '顶楼消火栓',
    };
    // 强制指定属性类型
    // static propTypes={ // 安装yarn add prop-types，引入import PropTypes from ‘prop-types’;
    //     name: PropTypes.string
    //     , age: PropTypes.number
    //     , sex: PropTypes.string.isRequired }//isRequired表示必须传递的string类型值

    constructor(props) {
        super(props);
        this.state = {
            data: this.data,//存储列表使用的数据
            refreshing: false,//当前的刷新状态
            equip_name: '',
            equip_no: '',
            param: '',
            year: '',
            equipData: [],
            equip_id: '',
        };
    }

    // 组件加载完成
    componentDidMount() {
        console.log("设备基本信息页面");
        // const { param } = this.props.navigation.state.params;
        const { item } = this.props.screenProps;// 获取中间媒介页面传递的参数
        const equip_id = this.props.screenProps.item.equip_id;
        this.setState({
            equip_id: item.equip_id,
        }, () => {
            console.log(this.state.equip_id, '可以的');
            this.fetchRoomList(this.state.equip_id);
        })

    }
    //根据项目id获取房间信息
    fetchRoomList = (equip_id) => {
        const URL = "http://116.62.186.91:8080/gywyext/equipEquipment/selectEquipmentById.do";
        console.log('根据设备id获取设备信息');
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "equip_id=" + equip_id,
        })
            .then((response) => response.json())
            .then((equipData) => {
                this.setState({
                    equipData: equipData.equipment,
                })
                console.log('equipData', this.state.equipData);
            })
            .catch((error) => {
                console.log('error', error);
            })
            .done();
    }
    render() {
        // const { item } = this.props.screenProps;// 获取中间媒介页面传递的参数
        return (
            <View style={{flex: 1,flexDirection: 'column',backgroundColor: '#F5F5F5', justifyContent: 'center',}}>

                    <View style={{ justifyContent: 'center', flexDirection: 'row', backgroundColor: '#5da8ff', width: Dimensions.get('window').width, height: 72 }}>
                        <View style={{ width: 40, height: 40, marginRight: 100, marginTop:30}}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('PageNavi') }}>
                                <Image
                                    source={require('../../image/goback.png')}
                                    style={{ width: 30, height: 30 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop:32.5}}>
                            <Text style={{ fontSize: 17.5 }}>基本信息</Text>
                        </View >
                        <View style={{ width: 40, height: 40, marginLeft: 105, paddingVertical: 15.5 }}>
                        </View>
                    </View>

                <View style={{ position:'relative', justifyContent: 'center', alignSelf:'center', width: 140, height: 140, backgroundColor:'#FFFFFF'}}>
                    {/*<Image source={this.state.equipData.file_id} style={styles.img}></Image>*/}
                    <View style={{ position: 'absolute' }}>
                        <Image source={require('../../image/pump.jpg')}
                            style={styles.img}>
                        </Image>
                    </View>
                </View>

                <View style={{ alignSelf: 'center', backgroundColor: '#FFFFFF', width: Dimensions.get('window').width * 9 / 10, height: 78.5, marginTop: 0, }}>
                    <View style={styles.eName1}>
                        <Text style={{ fontSize: 17.5, }}>
                            设备名称：{this.state.equipData.equip_name}
                        </Text>
                    </View>
                    <View style={styles.eName1}>
                        <Text style={{ marginTop: 3.5, marginLeft: 20, }}>
                            设备备注：{this.state.equipData.equip_memo}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent:'center', backgroundColor: '#FFFFFF', width: Dimensions.get('window').width, height: 78.5, marginTop: 8, }}>
                    <View  style={{width:Dimensions.get('window').width/2, marginLeft:12, padding:12}}>
                        <Text style={{ fontSize: 17.5, }}>
                            设备健康状态评估
                        </Text>
                        <Text style={{ fontSize: 17.5, }}>
                            设备健康状态评估
                        </Text>
                    </View>
                    <View style={{ width:Dimensions.get('window').width/2, padding:12 }}>
                        <Text style={{ fontSize: 17.5, }}>
                            设备下次维修时间
                        </Text>
                        <Text style={{ fontSize: 17.5, }}>
                            设备下次维修时间
                        </Text>
                    </View>
                </View>

                <View style={{ alignSelf: 'center', backgroundColor: '#FFFFFF', width: Dimensions.get('window').width, height: (Dimensions.get('window').height) * 3 / 10, marginTop: 8, }}>
                    <View style={styles.eName1}>
                        <Text style={{ fontSize: 17.5, }}>
                            设备详情
                        </Text>
                    </View>
                    <View style={{ marginLeft: 55.5, }}>
                        <View style={{ marginTop: 1.5 }}>
                            <Text >
                                设&nbsp;&nbsp;备&nbsp;&nbsp;制&nbsp;&nbsp;造&nbsp;&nbsp;&nbsp;商：{this.state.equipData.equip_manu}
                            </Text>
                        </View>
                        <View style={{ marginTop: 2.5 }}>
                            <Text >
                                制造商联系方式：{this.state.equipData.equip_tel}
                            </Text>
                        </View>
                        <View style={{ marginTop: 1.5 }}>
                            <Text >
                                设&nbsp;备&nbsp;维&nbsp;护&nbsp;周&nbsp;期：{this.state.equipData.equip_mdate}
                            </Text>
                        </View>
                        <View style={{ marginTop: 1.5 }}>
                            <Text >
                                设&nbsp;备&nbsp;折&nbsp;旧&nbsp;年&nbsp;限：{this.state.equipData.equip_life}
                            </Text>
                        </View>
                        <View style={{ marginTop: 1.5 }}>
                            <Text >
                                {/*设&nbsp;备&nbsp;使&nbsp;用&nbsp;日&nbsp;期：{this.state.equipData.equip_udate.month}-{this.state.equipData.equip_udate.date}*/}
                            </Text>
                        </View>
                        <View style={{ marginTop: 1.5 }}>
                            <Text >
                                设&nbsp;&nbsp;&nbsp;&nbsp;备&nbsp;&nbsp;&nbsp;&nbsp;寿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;命：{this.state.equipData.equip_atime}
                            </Text>
                        </View>
                        <View style={{ marginTop: 1.5 }}>
                            <Text >
                                设&nbsp;备&nbsp;购&nbsp;买&nbsp;费&nbsp;用：{this.state.equipData.equip_bfee}
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        );
    }

    // 返回到设备列表函数
    // _pressBackButton() {
    //     const {navigate} = this.props.navigation;
    //     if(navigate) {
    //         navigate.pop();
    //     }
    // }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DCDCDC',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        // paddingTop: 22,
    },
    back: {
        fontSize: 20,
        color: 'blue',
    },
    img: {
        // flex: 1,
        width: 145,
        height: 145,
        // marginLeft: 10,
        // marginRight:10,
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        marginTop: 0,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    title: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        height: 38,
        flexDirection: 'row',
        marginLeft: 8,
        marginTop: 3,
        marginBottom: 0,
        // borderWidth: 0.5,
    },
    details1: {
        marginTop: 3,
        // marginBottom:40,

    },
    details2: {
        marginTop: 0,
        marginBottom: 0,
    },
    edit: {
        marginLeft: 20,
        marginBottom: 20,
    },
    eName: {
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
    },
    eName1: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 5.5,
    },
});