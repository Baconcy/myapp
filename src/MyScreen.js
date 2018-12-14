import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Button,
    Dimensions,
} from 'react-native';
export default class MyScreen extends Component {
    static navigationOptions = {
    headerTitle:'二维码',
    headerRight: <View style={{backgroundColor: '#5da8ff'}}><Button color='#5da8ff' title=''/></View>,
    headerStyle: { backgroundColor: '#5da8ff' },  // 设置导航头部样式
        headerTitleStyle: {
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // alignSelf: 'center',
            textAlign: 'center',
            // color: '#333333',
            fontSize: 17.5,
        },  // 设置导航头部标题样式
  }
    constructor(props) {
        super(props);
        this.state = {
            data : [],
        };
    };
    // 组件加载完成
    componentDidMount() {
        console.log("component did load");
        //获取公司信息
        this.fetchCompInfo();

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ justifyContent:'center', flexDirection: 'row', backgroundColor: '#5da8ff', width:Dimensions.get('window').width, height: 55 }}>
                    <View style={{ width: 40, height: 40, marginRight:100, paddingVertical:7.5}}>
                        
                    </View>
                    <View style={{ paddingVertical:15.5 }}>
                        <Text style={{fontSize:17.5}}>公司信息</Text>
                    </View >
                    <View style={{ width: 40, height: 40, marginLeft:105, paddingVertical:15.5 }}>
                        
                    </View>
                </View>
                    <FlatList 
                        style={styles.list}
                        data={this.state.data}
                        renderItem={this._renderItem}
                        keyExtractor={this.keyExtractor}
                        ItemSeparatorComponent={this._separator}  
                    />
            </View>  
        );
            
    }
                        
                        
                        
    // 为给定的item生成一个不重复的key,若不指定则以item.key为key值.若item.key不存在,则用数组下标index
    keyExtractor=(item, index) => index
    // FlatList中的每一个item
    _renderItem = ({ item }) => {
        console.log(item, 123); 
        return (
                <TouchableOpacity>
                    <View style={styles.compInfo}>
                        <View style={styles.compDetail}>
                            <Text style={styles.unit}>
                                公司名称：{item.comp_name}
                            </Text>
                        <View style={styles.slot} >
                            <Text style={styles.unit} >
                                公司级别：{item.comp_rank}
                            </Text>
                        </View >
                        <View style={styles.slot}>
                            <Text style={styles.unit}>
                                员工数量：{item.comp_num}
                            </Text>
                        </View >
                        <View style={styles.slot}>
                            <Text style={styles.unit}>
                                公司地址：{item.comp_addr}
                            </Text>
                        </View >
                        <View style={styles.slot}>
                            <Text style={styles.unit}>
                                备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：{item.comp_memo}
                            </Text>
                        </View >
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }
    //分割线
     _separator = () => {
        return <View style={{height:1, backgroundColor:'lightgray'}}>
                </View>;
    }

    //获取公司信息
    fetchCompInfo() {
        const URL = "http://116.62.186.91:8080/gywyext/systemProject/getCompanyInfo.do";
        alert("开始获取公司信息");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: '',
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                data: this.state.data.concat(data.result),
                })
            console.log('data', data.result);
        })
        .catch((error) => {
            console.log('error', error);
        })
        .done();
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    list: {
        flex: 1,
    },
    compInfo:{
        // flexDirection: 'column',
        height: 135,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    compDetail: {
        flex: 1,
        marginTop: 9.5,
    },
    slot: {
        marginTop: 1.5,
    },
    unit: {
        width:190,
        fontSize:15.5,
    },
})