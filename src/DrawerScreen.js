import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Button,
    SectionList,
    Dimensions
} from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
} from "react-navigation";

//下拉框
import ModalDropdown from 'react-native-modal-dropdown';

import EquipListScreen from "./EquipListScreen";


import { ExpandableList } from "./ExpandableList";
import SectionHeader from './SectionHeader';

export default class DrawerScreen extends Component {
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
    // static defaultProps = {
    //     disabled: false,
    //     scrollEnabled: true,
    //     defaultIndex: -1,
    //     defaultValue: 'Please select...',
    //     options: null,
    //     animated: true,
    //     showsVerticalScrollIndicator: true,
    //     keyboardShouldPersistTaps: 'never'
    // };
    constructor(props) {
        super(props);
        this.state = {
            show: false, //收藏按钮
            company_id: '',
            companyData: [],
            ProjectData: [],
            proj_list: [],
            compName: [],
            //sectionList数据
            cellDataArray: [],
            compAndProjList: [
                {
                    groupHeaderData: { title: '公元物业总公司皮干' },
                    groupListData: ['清远凤城郦都', '展会演示项目', 'test2']
                },
                {
                    groupHeaderData: { title: 'testcom皮干' },
                    groupListData: ['清远凤城郦都', '展会演示项目', 'test2', '皮干']
                }
            ]
        };
        //源数据
        // this.cellDatas = [
        //     {
        //         key: '1', title: '公元物业总公司', show: true, data: [
        //             { key: '0', title: '清远凤城郦都' },
        //             { key: '1', title: '展会演示项目' },
        //             { key: '2', title: 'test2' },
        //         ]
        //     },
        //     {
        //         key: '2', title: 'testcom', show: true, data: [
        //             { key: '0', title: '清远凤城郦都' },
        //             { key: '1', title: '展会演示项目' },
        //             { key: '2', title: 'test2' },
        //         ]
        //     },
        // ];
        this.cellDatas = [];
    };
    // 组件挂载
    componentDidMount() {
        console.log("component loads DrawerScreen");
        let newArray = JSON.parse(JSON.stringify(this.cellDatas));
        this.setState({
            cellDataArray: newArray
        })
    }
    componentWillMount() {
        this.fetchCompanyList();
        // this.fetchProjectList();
        console.log("component will mount");
    }
    componentWillUnmount() {

    };
    startEmit(id) {
        //发送监听
        const message = id;
        DeviceEventEmitter.emit('bacon', message);
    }
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
            <View style={{ height: 1.5, backgroundColor: '#FFFFFF' }}>

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
        // console.log(info.item, 5555)
        //如果title为undefined （解决空数据section之间不显示问题）
        if (info.item.title == undefined) {
            return (<View>

            </View>);

        } else {
            return (
                <TouchableOpacity
                    onPress={() => { this.startEmit(info.item.id) }}
                >
                    <View style={{ height: 40, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 17.5, }}>
                        <Text style={{ color: '#696969', paddingHorizontal: 16.5, }} >
                            {info.item.title}
                        </Text>
                    </View>
                </TouchableOpacity>


            );
        }
    };

    // onPress={() => {
    //                     this.props.navigation.navigate('PageNavi', {
    //                         item: info.item,
    //                     });
    //                 }}
    // <View style={{ height: 40, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 25.5 }}>
    //                 <Text style={{ color: '#696969' }}>
    //                     {info.item.title}
    //                 </Text>
    //             </View>
    //添加key值
    keyExtractor = (item, index) => index
    //获取公司和项目信息
    fetchCompanyList = () => {
        const URL = "http://116.62.186.91:8080/gywyext/index/getInitLeft.do";
        console.log('公司项目信息');
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: '',
        })
            .then((response) => response.json())
            .then((companyData) => {
                const { leftResult } = companyData;
                //    let newComp = leftResult.map((item, index) => {
                //         let arr = leftResult.filter((subItem, index) => {
                //             if (item.comp_id == subItem.comp_id) {
                //                 return {
                //                     subItem
                //                 };
                //             }
                //         })
                //         // console.log(`equipments.length ${arr.length}`)
                //         return {
                //             ...item,
                //             // test: arr1,
                //             //下面所属的设备信息
                //             equipments: arr
                //         }
                //     })
                // const groupArray = (leftResult, key) => {
                //     const result = []
                //     const diff = {}
                //     leftResult.forEach(item => {
                //         if(!diff[item[key]]) {
                //             diff[item[key]] = {
                //                 title: item.comp_name,
                //                 data: [],
                //             }
                //             result.push(diff[item[key]])
                //         }
                //         diff[item[key]].data.push(item)
                //     })
                //     return result
                // }
                // const compAndProjList = result.map(item => ({
                //     groupHeaderData: {  //公司名称
                //         title: item.comp_name,
                //         ...item, // 剩余参数
                //     },
                //     groupListData: [],
                // }))

                const data = []
                leftResult.forEach((item, index) => {
                    var obj = {}
                    obj.key = index,
                        obj.id = item.comp_id
                    obj.title = item.comp_name
                    obj.data = leftResult.map((item, index) => {
                        return {
                            key: index,
                            id: item.proj_id,
                            title: item.proj_name
                        }
                    })
                    let state = true
                    data.forEach((sub, index) => {
                        if (sub.title === obj.title) {
                            state = false
                        }
                    })
                    if (state) {
                        data.push(obj)
                    }
                })

                this.setState({
                    companyData: this.state.companyData.concat(companyData.leftResult),
                    loaded: true,
                    cellDataArray: data,
                    // compAndProjList,
                    // cellDataArray: newComp.map((item, i) => ({
                    //     key:   i + 1, // i + 1, item.comp_id
                    //     title: item.comp_name,
                    //     show: true,
                    //     // data: [],
                    //     // data: [{
                    //     //     key: item.proj_id,
                    //     //     title: item.proj_name
                    //     // }]
                    //     data: item.equipments.map((subItem, i) => ({
                    //         key: i + 1,
                    //         title: subItem.proj_name,
                    //         ...subItem
                    //     }))

                    // }))
                })
                console.log('companyData456', this.state.companyData);
                console.log('cellDataArray123', this.state.cellDataArray);
                // console.log('newComp', newComp);
                // console.log(JSON.stringify(data))
                console.log(data, 111)
                // console.log('compAndProjList', compAndProjList);
                // console.log('compAndProjList', compAndProjList[0].groupHeaderData.comp_id);
                // this.fetchProjectList(compAndProjList); //获取公司下属的项目函数
            })
            .catch((error) => {
                console.log('error', error);
            })
            .done();
    }
    //根据公司id获取项目列表
    fetchProjectList = (item) => {
        const URL = "http://116.62.186.91:8080/gywyext/systemProject/getProjectInfo.do";
        console.log(item, '这是项目信息');
        // let params = item[0].groupHeaderData.comp_id
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'company_id=',
        })
            .then((response) => response.json())
            .then((ProjectData) => {
                const { result } = ProjectData;
                item[0].groupListData = result.map(item => item.proj_name);
                item[1].groupListData = result.map(item => item.proj_name);
                // compAndProjList.groupListData = result.map(item => item.proj_name);
                // const compAndProjList = result.map(item => ({
                //     groupListData: [item.proj_name]
                // }))
                this.setState({
                    ProjectData: this.state.ProjectData.concat(ProjectData.result),
                    // loaded: true,
                })
                // console.log('ProjectData', ProjectData);
                // console.log('groupListData', item);
            })
            .catch((error) => {
                console.log('error', error);
            })
            .done();
    }
    render() {
        // console.log(this.state.companyData, '公司数据');
        // console.log(this.state.compAndProjList, '公司名称');
        return (
            <View>
                <View style={{ position:'relative', flexDirection: 'row', backgroundColor: '#5da8ff', width: Dimensions.get('window').width, height: 55 }}>
                    <View style={{ width: 40, height: 40, marginRight: 30, paddingVertical: 7.5 }}>
                        <TouchableOpacity onPress={() => {
                                this.props.navigation.toggleDrawer();
                            }}>
                            <Text>开关</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal:9.5, paddingVertical: 15.5 }}>
                        <Text style={{ fontSize: 17.5 }}>公司项目信息</Text>
                    </View >
                    <View style={{ width: 40, height: 40, marginRight: 35, paddingVertical: 15.5 }}>
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
                {/*<View>
                    <Image
                        source={require('../image/equipPic.png')}
                        style={styles.equipPic}
                    />
                    <ModalDropdown style={styles.dropdown} dropdownStyle={{ width: 100, height: 200 }}
                            options={['option 1', 'option 2', 'option 3', 'option 4']}
                        />
                </View>*/}
                {/*<View style={styles.container}>
                    <ExpandableList
                        data={this.state.compAndProjList}
                        groupStyle={styles.groupItem}
                        initialOpenGroups={[0]}
                        renderGroupHeader={this._renderGroupHeader}
                        renderGroupListItem={this._renderGroupListItem}
                    />
                </View>*/}
                <View style={styles.container}>
                    <SectionList
                        SectionSeparatorComponent={this._renderSectionSeparatorComponent}
                        ItemSeparatorComponent={this._renderItemSeparatorComponent}
                        renderSectionHeader={this._renderSectionHeader}
                        renderItem={this._renderItem}
                        sections={this.state.cellDataArray}
                        extraData={this.state}
                        keyExtractor={this.keyExtractor}
                    />
                </View>
            </View>
        );

    }
    //ExpandableList的renderGroupHeader方法
    _renderGroupHeader({item, groupId, status, toggleStatus}) {
        console.log(item, 1111);
        return (
            <View style={[styles.headContainer, status && styles.headChosenContainer]}>
                <Text style={[styles.headTitleText, status && styles.headChosenTitleText]}
                >{item.title}</Text>
                <TouchableOpacity onPress={() => toggleStatus(false)}>
                    <View style={styles.touchArea}>
                        <Text style={{ color: status ? '#FFF' : '#333' }}>{status ? '关闭' : '展开'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    //ExpandableList的renderGroupListItem方法
    _renderGroupListItem({item, groupId, rowId}) {
        console.log(item, 2222);
        return (
            <View style={styles.listItemContainer}
                onPress={() => {
                    this.props.navigation.navigate({
                        title: 'NoUse',
                        passProps: {
                            age: 16,
                            address: 'xidian',
                        }
                    }
                        // item,
                    );
                }}
            >
                <Text style={styles.listItemText}
                    onPress={() => {
                        this.props.navigation.navigate('NoUse', {
                            // item,
                        });
                    }}
                >
                    {item}
                </Text>
            </View>
        );
    }
    // const {navigate} = this.props.navigation;

    //分割线 style={styles.list}
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: 'lightgray' }}>
        </View>;
    }
    //item添加key值
    keyExtractor = (item, index) => index
    // keyExtractor = (item2, index) => index
    // FlatList中的每一个item
    companyItem = ({item}) => {
        console.log(item, '公司列表');
        return (
            <TouchableOpacity onPress={() => { this._onPressListItem() }}>
                <View style={styles.compInfo}>
                    <Text style={styles.unit}>
                        {item.comp_name}
                    </Text>
                    {/*<View >
                        <Image
                            style={styles.spread_collect}
                            source={this.state.collectBtn == true ?
                                (require('../image/plus.png'))
                                :
                                (require('../image/minus.png'))}
                        />
                    </View>*/}
                </View>
            </TouchableOpacity>
        )
    }
    // FlatList中的每一个item
    projectItem = ({item}) => {
        console.log(item, '项目列表');
        return (
            <TouchableOpacity>
                <View style={styles.compInfo}>
                    <Text style={styles.unit}>
                        项目名称：{item.proj_name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    // 按压控制显示/隐藏菜单
    _onPressListItem = () => {
        this.setState((previousState) => {
            return ({
                show: !previousState.show,
            })
        });
    }


}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 20,
        borderTopColor: '#DDD',
        borderTopWidth: 1
    },
    groupItem: {
        borderBottomColor: '#DDD',
        borderBottomWidth: 1
    },

    list: {
        flex: 1,
    },
    compInfo: {
        // flexDirection: 'column',
        height: 135,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 12.5,
        // marginLeft: 12.5,
    },
    compDetail: {
        flex: 1,
        marginTop: 9.5,
    },
    slot: {
        marginTop: 1.5,
    },
    unit: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        marginLeft: 40.5,
        width: 190.5,
        fontSize: 16.5,
        // marginBottom: 15.5,
        marginTop: 10.5,
    },
    equipPic: {
        // backgroundColor: '#F5FCFF',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        width: 50,
        height: 40,
        marginLeft: 10.5,
        marginTop: 4.5,
    },
    dropdown: {
        // backgroundColor: '#F5FCFF',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        // width: 100,
        // height: 20,
        marginLeft: 10.5,
    },
    spread_collect: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        // flexDirection: 'row',
        width: 20,
        height: 20,
        marginRight: 225.5,
        marginTop: 1.5,
        marginBottom: 85.5,
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
})