import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

export default class MaintenanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maintenanceData: [],
      maintenanceInfo: [
        {
          date: '2018-11-28 上午12:00:00',
          worker: '皮干',
          time: 2,
          info: 123,
          result: '维保正常',
          memo: '123'
        }
      ],
    }
  }
  //   static navigationOptions = {
  //         title: '设备维保信息',
  //         titleStyle: {color: '#333333'},
  //         headerStyle:{backgroundColor:'#5da8ff'},
  //     }



  componentDidMount() {
    console.log('设备维保信息页面');
    const { item } = this.props.screenProps;// 获取中间媒介页面传递的参数
    this.setState({
      equip_id: item.equip_id,
    }, () => {
      console.log(this.state.equip_id, '设备维保信息页面');
      this.fetchEquipmentMaintenance(this.state.equip_id);
    })
  }
  //根据设备id获取维保信息
  fetchEquipmentMaintenance = (equip_id) => {
    const URL = "http://116.62.186.91:8080/gywyext/moblieAdd/getMaintenanceById.do";
    console.log('根据设备id获取维保信息');
    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "equip_id=" + equip_id,
    })
      .then((response) => response.json())
      .then((maintenanceData) => {
        const {result} = maintenanceData;
        const maintenanceInfo = result.map((item, index) => ({
          date: new Date(item.equip_main_date.time).toLocaleString(),
          worker: item.equip_main_worker,
          time: item.equip_main_time,
          info: item.equip_main_info,
          result: item.equip_main_result,
          memo: item.equip_main_memo
        }))
        this.setState({
          maintenanceData: maintenanceData.result,
          maintenanceInfo,
        })
        console.log('maintenanceData', this.state.maintenanceData);
        console.log('maintenanceInfo', this.state.maintenanceInfo);
      })
      .catch((error) => {
        console.log('error', error);
      })
      .done();
  }
  _renderItem = (item) => {
    console.log(item, '打印出来维保信息');
    return (
      <View >
        <View style={{ flexDirection: 'column', paddingTop: 9.5, justifyContent: 'center', alignItems: "flex-start", marginTop: 5 }}>
          <Text style={{ fontSize: 14.5, }}>
            维保日期：{item.item.date}
          </Text>
        </View>
        <View style={{ marginLeft: 115, paddingHorizontal: 5.5, borderWidth: 2.5, borderLeftColor: '#1E90FF', borderRightColor: '#F5FCFF', borderBottomRightRadius: 10, borderTopColor: '#F5FCFF', borderBottomColor: '#F5FCFF' }}>
          <Text style={{ fontSize: 14.5, }}>
            维保工人：{item.item.worker}
          </Text>
        </View>
        <View style={{ marginLeft: 115, paddingHorizontal: 5.5, borderWidth: 2.5, borderLeftColor: '#1E90FF', borderRightColor: '#F5FCFF', borderBottomRightRadius: 10, borderTopColor: '#F5FCFF', borderBottomColor: '#F5FCFF' }}>
          <Text style={{ fontSize: 14.5, }}>
            维保用时：{item.item.time}分钟
          </Text>
        </View>
        <View style={{ marginLeft: 115, paddingHorizontal: 5.5, borderWidth: 2.5, borderLeftColor: '#1E90FF', borderRightColor: '#F5FCFF', borderBottomRightRadius: 10, borderTopColor: '#F5FCFF', borderBottomColor: '#F5FCFF' }}>
          <Text style={{ fontSize: 14.5, }}>
            维保信息：{item.item.info}
          </Text>
        </View>
        <View style={{ marginLeft: 115, paddingHorizontal: 5.5, borderWidth: 2.5, borderLeftColor: '#1E90FF', borderRightColor: '#F5FCFF', borderBottomRightRadius: 10, borderTopColor: '#F5FCFF', borderBottomColor: '#F5FCFF' }}>
          <Text style={{ fontSize: 14.5, }}>
            {item.item.result == 0 ?
              <Text>维保结果：正常</Text>
              :
              <Text>维保结果：维保失败,需更换</Text>}
          </Text>
        </View>
        <View style={{ marginLeft: 115, paddingHorizontal: 5.5, paddingLeft: 2.5, borderWidth: 2.5, borderLeftColor: '#1E90FF', borderRightColor: '#F5FCFF', borderBottomRightRadius: 10, borderTopColor: '#F5FCFF', borderBottomColor: '#F5FCFF' }}>
          <Text style={{ fontSize: 14.5, }}>
            维保备注：{item.item.memo}
          </Text>
        </View>
      </View>
    )
  }
  // 为给定的item生成一个不重复的key,若不指定则以item.key为key值.若item.key不存在,则用数组下标index
  keyExtractor = (item, index) => index

  //分割线
  _separator = () => {
    return <View style={{ height: 1, backgroundColor: 'black' }}>
    </View>;
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={{ justifyContent: 'center', flexDirection: 'row', backgroundColor: '#5da8ff', width: Dimensions.get('window').width, height: 55 }}>
          <View style={{ width: 40, height: 40, marginRight:105, marginTop:13.5}}>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
              <Image
                source={require('../../image/goback.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop:17}}>
            <Text style={{ fontSize: 17.5 }}>维保信息</Text>
          </View >
          <View style={{ width: 40, height: 40, marginLeft:95}}>
            <Text></Text>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.maintenanceInfo}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
          separator={this._separator}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    fontSize: 20,
    color: 'blue',
  },
});