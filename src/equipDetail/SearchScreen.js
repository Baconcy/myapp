import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    Button,
    ListView,
    Alert,
    TouchableHighlight,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {
    StackNavigator,
} from 'react-native';
import RunningScreen from "./RunningScreen";
import BasicScreen from "./BasicScreen";
import MaintenanceScreen from "./MaintenanceScreen";

export default class EquipListScreen extends Component {
    
    constructor(props) {
        super(props); 
        this.state = {
            testTitle: '',
            searchText: '',
            currentPage: 0,
            title: [],
            isRefreshing: false,
            data: [],
            loaded: false,
            equip_name: '',
        };
    }
    
    // 组件加载完成
    componentDidMount() {
        // 刷新数据
        console.log("component did load");
    }
   
    //组件卸载
    componentWillUnmount() {
        console.log("component did unmount");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchbar}>
                    {/*设置手机状态栏的显示样式*/}
                    <StatusBar 
                        backgroundColor={'blue'} 
                        barStyle={'default'}
                        networkActivityIndicatorVisible={true}>
                    </StatusBar>
                    <TextInput 
                        style={styles.input} 
                        placeholder='输入设备型号或名称'
                        onChangeText={(text)=>{
                            this.setState({equip_id: text});
                        }}
                        >
                    </TextInput>
                    <Button 
                        style={styles.button} 
                        title='搜索'
                       onPress={(equip_id)=>this.fetchEquipBasicInfo(this.state.equip_id)} 
                    />
                </View>
                    <FlatList 
                        style={styles.list}
                        data={this.state.data} 
                        renderItem={this._renderItem} 
                        ItemSeparatorComponent={this._separator}
                        keyExtractor={this.keyExtractor}
                    />
            </View>  
        );
    };

//onChangeText={this._onChangeText.bind(this)}
//onPress={()=>{Alert.alert('设备型号或名称为：' + this.state.equip_id, null, null);}}
//onPress={(equip_id)=>this.fetchEquipBasicInfo(equip_id)} 
//onPress={() => {this.props.navigation.navigate('Search')}}
    

    // 为给定的item生成一个不重复的key,若不指定则以item.key为key值.若item.key不存在,则用数组下标index
    keyExtractor=(item, index) => index
    // FlatList中的每一个item
    _renderItem = ({ item }) => {
        console.log(item, 123); 
        return (
                <TouchableOpacity onPress={ () => {
                        this.props.navigation.navigate('EquipInfo', {
                        item,});
                            }}>
                    <View style={styles.row}>
                        <Image style={styles.equipImg}
                            source={require('../../image/pump.jpg')} >
                        </Image>
                        <View style={styles.equipText}>
                            <Text style={styles.equipTitle}>
                                {item.equip_name}
                            </Text>
                            <Text style={styles.equipSubTitle}>
                                {item.equip_no}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }
    //分割线
     _separator = () => {
        return <View style={{height:1,backgroundColor:'lightgray'}}>
                </View>;
    }
    //刷新函数
    _onRefresh = () => {
        this.setState({isRefreshing: true}); //状态为正在刷新
        setTimeout( () => {//可增加对设备的更新
            this.setState({isRefreshing: false});
        },1000);
    }

    //根据设备id搜索设备信息
    fetchEquipBasicInfo(equip_id) {
        console.log(this.state.equip_id, 456);
        const data = '';
        const URL = "http://116.62.186.91:8080/gywyext/equipEquipment/getEquipmentListByPage.do";
        if( this.state.equip_id == '' ) {
            alert('请输入设备型号或名称！');
        } else {
            alert('开始获取设备信息000');
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
             body: 'page=1&searchKey=equip_id',
            })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ 
                    data: this.state.data.concat(data),
                    })
                console.log('已经得到设备基本信息data.equipment', data);
            })
            .catch((error) => {
                console.log('error', error);
            })
            .done();
            }
        
        
        }

    

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchbar: {
        marginTop: Platform.OS ==='ios' ? 20 : 0,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
    },
    button:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        color: '#F5FCFF',
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
        marginRight:10,
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
        flex:1,
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
  });