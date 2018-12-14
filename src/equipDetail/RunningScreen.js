import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Button,
    Dimensions,
    Platform,
    ScrollView,
    Image,
    TouchableOpacity,
    PanResponder,
    TextInput
} from 'react-native';
import SelectDialog from 'react-native-select-dialog'; //弹框组件
import Echarts from 'native-echarts'; //echarts组件
import DatePicker from 'react-native-datepicker'; //日期组件
const {width} = Dimensions.get('window');


export default class RunningScreen extends Component {
    static navigationOptions = {
          title: '运行信息',
          titleStyle: {color: '#333333'},
          headerStyle:{backgroundColor:'#5da8ff'},
      }
    // RN初始化页面会先读取这个，然后渲染render
    constructor(props) {
        super(props);
        this.state = {
            paraData: [],
            result: [],
            loaded: false,
            name: 'bacon',
            data: [],
            realData: [],
            xData: [],
            operTime: [],
            equip_id: '',
            // paramData: [],
            newParamData: [
                {
                    txt: '',
                    id: ''
                },
            ],
            date: '',
            datetime1: '2018-10-05 00:00:00',
            equip_param: ''

        };
        // this.newParamData = [
        //     { txt: '水泵房温度皮干', id: 'option1' },
        //     { txt: '水泵房湿度皮干', id: 'option2' },
        //     { txt: '中国银行', id: 'option3' },
        //     { txt: '交通银行', id: 'option4' },
        //     { txt: '招商银行', id: 'option5' },
        //     { txt: '中国邮政储蓄银行', id: 'option6' },
        // ];
        this.dataList = [
            { name: '小红', id: 'option1', age: 13 },
            { name: '小明', id: 'option2', age: 14 },
            { name: '小林', id: 'option3', age: 15 },
            { name: '小李', id: 'option4', age: 16 },
            { name: '小赵', id: 'option5', age: 17 },
            { name: '小兰', id: 'option6', age: 18 },
        ];
    }

    componentDidMount() {
        console.log('设备运行信息页面');
        const { item } = this.props.screenProps;// 获取中间媒介页面传递的参数
        // const equip_id = this.props.screenProps.item.equip_id;
        this.setState({
            equip_id: item.equip_id,
        }, () => {
            console.log(this.state.equip_id, '设备运行信息页面');
            this.fetchEquipmentParam(this.state.equip_id);
        })
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e) => { console.log('onStartShouldSetPanResponder'); return true; },
            onMoveShouldSetPanResponder: (e) => { console.log('onMoveShouldSetPanResponder'); return true; },
            onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
            onPanResponderMove: (e) => console.log('onPanResponderMove'),
            onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
            onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
        });
    }
    changBank = (item, index) => {
        console.log(item, '银行数据')
        this.setState({ mess: item.txt, id: item.equip_para_id, index: item.id, valChange: true })
    }
    changList(item, index) {
        this.setState({
            listtxt: item.name,
            listindex: item.id,
            listage: item.age,
            vallistChange: true
        })
    }
    show = () => {
        this.refs.bankName.show()
    }
    showList = () => {
        this.refs.showList.show()
    }
    //根据设备id获取设备运行参数
    fetchEquipmentParam = (equip_id) => {
        const URL = "http://116.62.186.91:8080/gywyext/moblieAdd/getParaById.do";
        console.log('获取设备特征参数');
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "equip_id=" + equip_id,

        })
            .then((response) => response.json())
            .then((paramData) => {
                const { result } = paramData;
                const newParamData = result.map((item, index) => ({
                    txt: item.equip_para_name,
                    id: item.equip_para_id,
                    ...item,
                }))
                this.setState({
                    paramData: paramData.result,
                    newParamData: newParamData,
                })
                // console.log('paramData', this.state.paramData);
                console.log('newParamData', this.state.newParamData);
            })
            .catch((error) => {
                console.log('error', error);
            })
            .done();
    }

    //获取设备实时运行数据
    fetchEquipmentRealData (equip_para_id, startDate) {
        const URL = "http://116.62.186.91:8080/gywyext/equipRealInfo/getEquipRealDataByTime.do";
        alert(equip_para_id + "---" + startDate, "设备参数id和起始时间");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "equip_para_id=" + equip_para_id + "&startDate=" + startDate,
        })
            .then((response) => response.json())
            .then((realData) => {
                this.setState({
                    realData: this.state.realData.concat(realData.data),
                    loaded: true,
                })
                console.log('realData', realData);
            })
            .catch((error) => {
                console.log('error', error);
            })
            .done();
    }
    //设备参数录入
    addEquipmentParam (equip_para_id, equip_param) {
        const URL = "http://116.62.186.91:8080/gywyext/moblieAdd/addOpeartion.do";
        alert(equip_para_id + "---" + equip_param, "录入设备参数");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "equip_para_id=" + equip_para_id + "&equip_operation_info=" + equip_param,
        })
            .then((response) => response.json())
            .then((result, done) => {
                // console.log(result, 456789)
                if (result == 'ok') {
                    alert('录入成功！');
                } else {
                    alert('录入失败！');
                }
            })
    }

    render() {
        const listVal = this.state.valChange ? this.state.mess : this.state.initTxt
        const listVal2 = this.state.vallistChange ? this.state.listtxt : this.state.initlistTxt
        const { item } = this.props.screenProps;// 接收参数
        // const equip_id = item.equip_id;
        console.log(item.equip_id, 'item.equip_id');
        // console.log(this.state.realData, 'realData');
        // console.log(this.state.paraData, 'paraData');

        // const { equip_id } = this.props.navigation.state.params;
        var operTime = [];
        var operInfo = [];
        this.state.realData.map(function (v) {
            if (v.equip_oper_time != '') {
                operTime.push(v.equip_oper_time);
            }
            if (v.equip_oper_info != '') {
                operInfo.push(v.equip_oper_info);
            }
        })
        // console.log(operTime, '运行时间');
        // console.log(operInfo, '运行信息');
        // console.log(equip_id, '某一具体设备id');

        option = {
            title: [
                {
                    text: '运行状态',
                    left: 'left',
                },
                {
                    // text: '温度',
                    // subtext:'实线',
                    textStyle: {
                        color: '#c23531'
                    },
                    right: 50,
                    top: 90
                },
            ],
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>'
            },
            // legend: {  {a0}
            //     data:['China','United States']
            // },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {},
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar']
                    },
                    restore: {},
                    saveAsImage: {
                        pixelRatio: 5
                    }
                }
            },
            //x轴内容
            xAxis: {
                type: 'category',
                // name: '日期',
                // min:-35,
                boundaryGap: false,
                axisLabel: {
                    rotate: -25,
                    interval: 8,
                },
                // data: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,]
                data: operTime,
            },
            yAxis: {
                type: 'value',
                // min:-35,
                // name: '温度',
                axisLabel: {
                    formatter: '{value}',
                    // rotate:25, ℃
                    // interval:5,
                }
            },
            series: [
                {
                    // name: 'China',
                    type: 'line',
                    data: operInfo,
                    markPoint: {
                        label: {
                            show: true,
                            formatter: '{c}℃'
                        },
                        data: [{
                            type: 'max',
                            name: '最大值'
                        },
                        {
                            type: 'min',
                            name: '最小值'
                        },
                            // {
                            //     coord: [41, 15],
                            //     name: '15',
                            //     value: 15
                            // }
                        ]
                    },
                },

            ]
        };

        return (
            <View style={styles.container}>

                <View style={{ justifyContent: 'center', flexDirection: 'row', backgroundColor: '#5da8ff', width: Dimensions.get('window').width, height: 55 }}>
                    <View style={{ width: 40, height: 40, marginRight: 100,marginVertical: 13.5 }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                            <Image
                                source={require('../../image/goback.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 15.5 }}>
                        <Text style={{ fontSize: 17.5 }}>运行信息</Text>
                    </View >
                    <View style={{ width: 40, height: 40, marginLeft:105,  }}>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.titleView}>
                        <Text style={{ fontSize: 17.5 }}>设备名称：{item.equip_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }} >
                        <TouchableOpacity style={[styles.borderGray, styles.borderRadius3,
                        {
                            flexDirection: 'row', height: 42.5,
                            margin: 22.5
                        }]}
                            onPress={this.show.bind(this)}
                            underlayColor="transparent">
                            <View style={[styles.flexRow, styles.flex1, styles.Acenter]}>
                                <Text style={[styles.flex1, { fontSize: 14.5, paddingLeft: 10 }]}>
                                    请选择设备参数：{listVal}
                                </Text>
                                <Image style={{ marginRight: 10, width: 20.5, height: 20.5 }} source={require('../../image/Arrow.png')} />
                            </View>
                        </TouchableOpacity>
                        {/*<View style={{ paddingHorizontal: 36.5 }}>
                            <Text >设备参数和参数id分别为：
			                {this.state.mess}-{this.state.index}
                            </Text>
                            <Text></Text>
                        </View>*/}
                        <SelectDialog
                            ref="bankName"
                            titles={'请选择银行'}
                            valueChange={this.changBank.bind(this)}
                            datas={this.state.newParamData}
                            animateType={'fade'}
                        />
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', top: 100.5 }}>
                        <View>
                            <DatePicker
                                style={{
                                    width: 200, borderWidth: 1, marginTop: 29.5,
                                    borderColor: '#808080', borderRadius: 3, marginLeft: 26.5,
                                }}
                                date={this.state.datetime1}
                                mode="datetime"
                                format="YYYY-MM-DD HH:mm:ss"
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 1.5
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                minuteInterval={10}
                                onDateChange={(datetime) => { this.setState({ datetime1: datetime }); }}
                            />
                        </View>
                        <View >
                            <TouchableOpacity
                                style={{ alignItems: 'center', padding: 8.5, borderColor: '#1E90FF', borderWidth: 1, borderRadius: 3, width: 85, backgroundColor: '#1E90FF', marginLeft: 18.5, marginTop: 30.5 }}
                                onPress={() => { this.fetchEquipmentRealData(this.state.id, this.state.datetime1) }}
                            >
                                <Text style={{ fontSize: 15.5 }}>开始查询</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ position: 'absolute', flexDirection: 'row', left: 26.5, top: 182.5 }}>
                        <View style={{
                            width: 200, borderWidth: 1,
                            borderColor: '#808080', borderRadius: 3,
                        }}>
                            <TextInput
                                style={{ height: 40.5, }}
                                placeholder='请输入要录入的参数'
                                underlineColorAndroid="transparent"
                                autoCorrect={false}
                                spellCheck={false}
                                placeholderTextColor="#a8afc3"
                                selectionColor="#0064ff"
                                value={this.state.equip_param}
                                onChangeText={(text) => {
                                    this.setState({ equip_param: text })
                                }}
                            />
                        </View>
                        <View >
                            <TouchableOpacity style={{ alignItems: 'center', padding: 8.5, borderColor: '#1E90FF', borderWidth: 1, borderRadius: 3, width: 85, backgroundColor: '#1E90FF', marginLeft: 18.5, }}

                                onPress={ () => this.addEquipmentParam(this.state.id, this.state.equip_param) }
                            >
                                <Text style={{ fontSize: 15.5 }}>确认修改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{ position: 'relative', marginTop: 240, marginLeft:12.5 }}>
                    <Echarts option={option} height={254.5} width={352} />
                </View>
            </View>

        );
    }
    defineList(rowData, rowID, highlighted) {
        // let icon = highlighted ? require('./images/selected.png') : require('./images/select.png');
        let evenRow = rowID % 2;
        return (
            <View style={[styles.flexRow,
            {
                backgroundColor: evenRow ? '#dfdfdf' : 'white',
                alignItems: 'center', height: 36
            }]}>
                {/*<Image style={{ width: 18, height: 18, marginLeft: 10, marginRight: 10 }}
					mode='stretch'
                    source={icon}
				/>*/}
                <Text style={[styles.listTxt,
                highlighted && { color: 'mediumaquamarine' }]}>
                    {rowData.name}{rowData.age}
                </Text>
            </View>

        );
    }

    d777(data) {
        console.log("d777");
        var xData = [],
            yData = [];
        for (var i = 0; i < data.length; i++) {
            xData.push(data[i].name);
            yData.push(data[i].value);
        }

        var option = {
            title: {
                text: '故障种类分析',
                left: 'left',
                textStyle: {
                    color: "#fff",
                    fontWeight: 'lighter',
                    fontSize: 14,
                }
            },
            grid: {//确定图表在屏幕中的位置
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '5%',
                /*height: '23%',*/
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: 'category',
                gridIndex: 0,
                data: xData,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interArrivar: 0,
                    rotate: +30,
                },
                axisLine: {//x轴颜色设置
                    lineStyle: {
                        color: '#0c3b71'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                gridIndex: 0,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                min: 0,
                max: 50,
                axisLine: {
                    lineStyle: {
                        color: '#0c3b71'
                    }
                }
            }
            ],
            calculable: true,
            series: [{
                name: '合格率',
                type: 'bar',
                barWidth: '30%',
                xAxisIndex: 0,
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00feff'
                        },
                        {
                            offset: 0.5,
                            color: '#027eff'
                        },
                        {
                            offset: 1,
                            color: '#0286ff'
                        }
                        ]
                        )
                    },
                    label: {}
                },
                data: yData,
                zlevel: 11

            }]
        };
        d7.setOption(option);
        window.onresize = d7.resize;//自适应窗口大小
        d7.hideLoading();
    }

    //分割线
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: 'lightgray' }}>
        </View>;
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    datepicker: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        // flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center'
    },
    demo: {
        textAlign: 'center',
        fontSize: 50,
    },
    titleView: {
        height: Platform.OS == 'ios' ? 74 : 54,
        paddingTop: Platform.OS == 'ios' ? 14 : 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderLeftColor: '#F5F5F5',
        borderTopColor: '#F5F5F5',
        borderRightColor: '#F5F5F5',
        borderBottomColor: '#808080'
    },
    equipPara: {
        borderColor: 'gray',
        fontSize: 17.5,
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
        borderColor: '#808080'
    },
    borderRadius3: {
        borderRadius: 3
    },
    //时间组件样式
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    button: {
        padding: 10,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 3
    }

});