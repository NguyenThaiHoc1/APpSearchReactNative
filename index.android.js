/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   Text,
   View,
   FlatList,
   ActivityIndicator
 } from 'react-native';
 import { Button ,List, ListItem, SearchBar} from 'react-native-elements';

 const listItemUser = [
   {
     key: 'a',
     name: "Nguyen Thai Hoc",
     age: 21
   },
   {
      key: 'b',
     name: "Bui Duy Khoi",
     age: 20
   },
   {
      key: 'f',
     name: "Vu Dang Khoa",
     age: 28
   },
   {
      key: 'c',
     name: "Dao Duy Anh",
     age: 23
   },
   {
      key: 'd',
     name: "Never forget",
     age: 22
   },
   {
      key: 'dxxa',
     name: "Never forget",
     age: 22
   },
   {
      key: 'pos',
     name: "Naever forsxget",
     age: 22
   },
   {
      key: 'e',
     name: "Nevser fosrget",
     age: 22
   },
   {
      key: 'fsxa',
     name: "Nesver forget",
     age: 22
   },
   {
      key: 'xx',
     name: "Never fosrget",
     age: 22
   },
   {
      key: 'x',
     name: "Nesver forgset",
     age: 22
   },
   {
      key: 'xa',
     name: "Never forget",
     age: 22
   },
   {
      key: 'cx',
     name: "Never forget",
     age: 22
   },
   {
      key: 'uwix',
     name: "Never forget",
     age: 22
   },

 ]

 export default class flastlistTesting extends Component {

 constructor(props) {
     super(props);
     this.state = {
         seed: 1,
         page: 1,
         results: 30,
         data:[],
         datafiltt: [],
         loading: false,
         refreshing: false
     };
 }

 componentDidMount()
 {
    this.loadingUserForPage();
 }


 loadingUserForPage = () => {
     const url = 'https://randomuser.me/api/?seed='+ this.state.seed +'&page='+ this.state.page +'&results='+ this.state.results;
     this.setState({ loading:true });
     fetch(url)
     .then((res) => res.json() )
     .then((dataJSON)=> {
        this.setState({
           data: dataJSON.results,
           datafiltt: dataJSON.results,
           loading: false,
           refreshing: false
         });
         //alert(dataJSON);
     }).catch((err) => {
         //this.state.loading = true;
         this.setState({
           loading: false,
           refreshing: false
         })
     }).done(() => { });
 }

 renderSeparator = () => {
   return (
     //CED0CE
       <View
         style={{
             height: 1,
             width: "100%",
             backgroundColor: "#CED0CE",
             marginLeft: "14%"
         }}
       />
   );
 };

 searchBarListItem = (item) => {
    var dataFiltter = [];
    for(let i = 0 ; i < this.state.data.length; i++) {
        var email = this.state.data[i].email.toLowerCase();
        if(email.indexOf(item.toLowerCase()) > -1) {
          dataFiltter.push(this.state.data[i]);
        }
    }
    this.setState({
      datafiltt: dataFiltter
    })
 }

 renderHeader = () => {
    return <SearchBar onChangeText={this.searchBarListItem} placeholder="Type Here..." lightTheme round/>
 };

 renderFooter = () => {
   if(!this.state.loading) return null;
   return(
     <View
       style={{
         paddingVertical: 20,
         borderTopWidth: 1
       }}
     >
       <ActivityIndicator animating size="large"/>
     </View>
   );
 };

 handleRefresh = () => {
    const min = 1;
    const max = 20;
    const rand = min + Math.random() * (max - min);

    const rand1 = min + Math.random() * (max - min);

    this.setState({
      seed: rand,
      page: rand1,
      refreshing: true
    }, () => {
      this.loadingUserForPage();
    });

 };

 render() {
     return (
       <List containerStyle={{borderTopWidth:0, borderBottomWidth: 0, backgroundColor: "#f1f1f1"}}>
           <FlatList
             data={this.state.datafiltt}
             //renderItem={({item}) => this.functionRender(item)}
             renderItem={({item}) => (
                <ListItem
                  roundAvatar
                  title={item.name.first + ' ' + item.name.last}
                  subtitle={item.email}
                  avatar={{uri:item.picture.thumbnail}}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
              )}
             keyExtractor={item => item.email}
             ItemSeparatorComponent={this.renderSeparator}
             ListHeaderComponent={this.renderHeader}
             ListFooterComponent={this.renderFooter}
             refreshing={this.state.refreshing}
             onRefresh={this.handleRefresh}
           />
       </List>

     );
   }
 }



AppRegistry.registerComponent('FlastListTesting', () => flastlistTesting);
