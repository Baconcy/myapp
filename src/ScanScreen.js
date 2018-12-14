import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'
import Barcode from 'react-native-smart-barcode'; //扫一扫
import TimerEnhance from 'react-native-smart-timer-enhance'; // 
export default class ScanScreen extends Component {
  static navigationOptions = {
    headerTitle: '二维码',
    headerRight: <View style={{ backgroundColor: '#5da8ff' }}><Button color='#5da8ff' title='' /></View>,
    headerStyle: { backgroundColor: '#5da8ff' },  // 设置导航头部样式
    headerTitleStyle: { // 设置导航头部标题样式
      flex: 1,
      textAlign: 'center',
      fontSize: 17.5,
    },
  }
  // static navigationOptions = ({navigation}) => ({
  //   headerTitle: '二维码',
  //   headerRight: <View style={{backgroundColor: '#5da8ff'}}><Button color='#5da8ff' title=''/></View>,
  //   headerStyle: { backgroundColor: '#5da8ff' },
  //   headerTitleStyle: { flex: 1, textAlign: 'center', fontSize: 17.5, },

  // });

  constructor(props) {
    super(props);
    this.state = {
      //扫一扫
      viewAppear: false,
    };
  }
  // 组件加载完成
  componentDidMount() {
    //启动定时器
    this.timer = setTimeout(() => this.setState({ viewAppear: true }),
      250
    );
  }
  //组件卸载
  componentWillUnmount() {
    //清除定时器
    this.timer && clearTimeout(this.timer);
  };
  //扫一扫
  _onBarCodeRead = (e) => {
    console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
    this._stopScan();
    this.setState({
      equip_id: e.nativeEvent.data.code,
    })
    Alert.alert(e.nativeEvent.data.type, e.nativeEvent.data.code, [
      { text: 'OK', onPress: () => {this.props.navigation.navigate('PageNavi') }},
    ]);

  }

  _startScan = (e) => {
    this._barCode.startScan();
  }

  _stopScan = (e) => {
    this._barCode.stopScan();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', }}>

        <View style={{ justifyContent: 'center', flexDirection: 'row', backgroundColor: '#5da8ff', width: Dimensions.get('window').width, height: 55 }}>
          <View style={{ width: 40, height: 40, marginRight: 110, marginTop: 12.5 }}>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
              <Image
                source={require('../image/goback.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 15.5 }}>
            <Text style={{ fontSize: 17.5 }}>二维码</Text>
          </View >
          <View style={{ width: 40, height: 40, marginLeft: 105, paddingVertical: 15.5 }}>
          </View>
        </View>
          {this.state.viewAppear ?
          <Barcode
            style={{ flex: 1, }}
            ref={component => this._barCode = component}
            onBarCodeRead={this._onBarCodeRead} />
          :
          null
        }
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});