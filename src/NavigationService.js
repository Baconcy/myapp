

import React, { Component } from 'react';

import { NavigationActions } from 'react-navigation';



let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigate(ScanScreen) {
  _navigator.dispatch(
    NavigationActions.navigate({
      ScanScreen,
    })
  );
}

function navigate(EquipInfo) {
  _navigator.dispatch(
    NavigationActions.navigate({
      EquipInfo,
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};

// export default class NavigationService extends Component {

//     render() {
//         return (
        
//         );
//     }
    
// }