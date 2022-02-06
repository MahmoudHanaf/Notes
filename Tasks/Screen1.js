

// import React from "react";
// import {
//   Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,
// } from 'react-native'

// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Dimensions } from 'react-native';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// import AsyncStorage from '@react-native-community/async-storage'
// import { createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'

// export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       title: '',
//       content: '',
//       index: ''
//     }
//   }


//   componentDidMount() {
//     let title = this.props.navigation.getParam("title")
//     let content = this.props.navigation.getParam("content")
//     let index = this.props.navigation.getParam("index")

//     this.setState({
//       title: title,
//       content: content,
//       index: index
//     })
//   }

//    change_note () {
    
//     let data =this.state.Data 
//      data[this.state.index].content=this.state.content
//      data[this.state.index].title=this.state.title

//      this.setState({Data:data})
//    }




//   render() {
//     return (
//       <>

//         <StatusBar
//           backgroundColor="#FF6C00"
//         />
//         <View style={styles.view_style_modal} >
//           <Image source={require('../img/m1.png')}
//             style={{ width: '15%', height: 50, resizeMode: 'contain' }}
//           />
//           <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#fff' }}>تعديل ملاحظة </Text>
//           <TouchableOpacity
//             onPress={() => {
//               this.props.navigation.goBack()
//             }}
//           >
//             <Icon name="arrow-left" size={23} style={{ color: '#fff' }} />
//           </TouchableOpacity>
//         </View>


//          <View style={styles.container_modal}>
//             <View style={styles.text_input_modal}>

//              <TextInput  style={{fontSize:20,textAlign:'center'}}
//                value ={this.state.title}
//                  onChangeText={(value)=>{
//                    this.setState({title:value})
//                  }}
//                />

//                <TextInput  style={{fontSize:20}}
//                value ={this.state.content}
//                  onChangeText={(value)=>{
//                    this.setState({content:value})
//                  }}
//                />
//             </View>
             
//              <TouchableOpacity 
//                onPress={()=>{
//                  this.change_note()
//                }}
//              >
//             <View style={styles.save_modal}>
//                 <Text style={{fontSize:24,fontWeight:'bold',color:'#fff'}}>حفظ</Text>
//             </View>
//             </TouchableOpacity>
            
//          </View>


//       </>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   view_style_modal: {
//     width: '100%',
//     height: '8%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#FB7900',
//     flexDirection: 'row',
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   container_modal:{
//     width:'100%',
//     height:'50%',
//     //backgroundColor:'#0ff',
//     justifyContent:'space-around',
//     alignItems:'center'
//   },
//   text_input_modal :{
//     width:'90%',
//     backgroundColor:'#0ff',
//     borderRadius:15,
//     paddingLeft:10,
//     paddingRight:10,
//   },
//   save_modal:{
//     width:120,
//     height:50,
//     backgroundColor:'#FB7900',
//     justifyContent:'center',
//     alignItems:'center',
//     borderRadius:15
//   }

// })

///////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList
  , Alert, Modal, TouchableNativeFeedbackBase,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import * as ImagePicker from 'react-native-image-picker';
//import DateTimePicker from '@react-native-community/datetimepicker';


import Screen1 from './Tasks/Screen1'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      Data: [
      ],
      visible_modal: false,
      index: 0,
      photo:'',
      searchText: '',
      check:0,
      isVisible: true,
      tirmnate: true,
    }
  }


  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false
    });
  }

 


  componentDidMount() {
   this.requestCameraPermission();

    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 3000);
   //  this.setData()
   this.getData()
  }


  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  select_first_photo() {

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary({ options, includeBase64: true }, (res) => {
      // console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
            console.log(res)
        this.setState({
          first_photo_data: res,
          photo: res.uri,
          first_photo_string: res.base64
        });

      }
    });

    
  }




search(searchText) {
  let list = this.state.Data;
  let check = this.state.check = 0;
  for (let i = 0; i < list.length; i++) {
      if ((list[i].title.toUpperCase()).includes((searchText.trim()).toUpperCase())) {
          list[i].show = true;
          // return list[i]
          check++;
      } else {
          list[i].show = false;

      }
  }

  this.setState({ Data: list, });
}



async setData() {
  let data = this.state.Data
  await AsyncStorage.setItem("data", JSON.stringify(data))
}

async getData() {

  let data = await AsyncStorage.getItem("data")
  data = JSON.parse(data)
  this.setState({ Data: data })
}


  Add_note() {
    let data = this.state.Data
    if (this.state.title == '' && this.state.content == '') {
      alert("لا توجد ملاحظات")
    }
    else {

     
        let obj = {
          title: this.state.title,
          content: this.state.content,
          show:true,
       } 
     
      data.unshift(obj)
     
      this.setState({ Data: data })
      this.setData()
      
    }
    
  }


  Delete_note(index) {
    let data = this.state.Data
    data.splice(index, 1)
    this.setState({ Data: data })
    this.setData()
  }


  createTwoButtonAlert = () =>
    Alert.alert(
      "هل تريد حذف الملاحظة ؟ ",
      "",

      [
        {
          text: "لا",
          onPress: () => console.log("Cancel Pressed"),
          style: 'cancel',
        },
        { text: "نعم", onPress: () => this.Delete_note() }
      ],
      { cancelable: false }
    );



  change_note() {

    let data = this.state.Data
    data[this.state.index].content = this.state.content
    data[this.state.index].title = this.state.title

    this.setState({ Data: data })
    this.setData()
  }


  render() {

    let Splash_Screen = (

      <View style={styles.SplashScreen_RootView}>
        <StatusBar
          hidden={true}
        />
        <View style={styles.SplashScreen_ChildView}>

          <Image source={require('./img/m1.png')}
            style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />
        </View>
      </View>)

    return (
      <>

        <StatusBar
          backgroundColor="#FF6C00"

        />
        <View style={styles.style_view}>
          <Image source={require('./img/m1.png')}
            style={{ width: '15%', height: 50, resizeMode: 'contain' }}
          />
          <View style={styles.search}>
            <Icon name="search" size={20} style={{}} />
            <TextInput style={{ fontSize: 18, width: '90%' }}
            
            onChangeText={
              (value) => {
                  this.setState({ searchText: value })
                  this.search(value)
              }
          }
            />
          </View>
        </View>


        <View style={styles.container}>
          <ScrollView>
            
            {
              this.state.Data.map((item, index) =>
                item.show == true?(
                  <View style={styles.style_map}>
                  <Text style={[styles.style_text, { textAlign: 'center' }]}>{item.title}</Text>
                  <Text style={styles.style_text}>{item.content}</Text>
                 
                 {
                   item.photo!=''?(
                    <Image source={{uri:item.photo}}
                    style={{width:100,height:100,}}
                  />
                   ):(
                    null
                   )
                  
                 }
                   
                
                  <View
                    style={{
                      flexDirection: 'row',
                      width: windowWidth * .86,
                      alignSelf: 'center',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>

                    <TouchableOpacity
                      onPress={() => {
                        //  this.props.navigation.navigate("Page2",{
                        //    index:index,
                        //    title:item.title,
                        //    content:item.content,
                        //  })
                        this.setState({ visible_modal: true, index: index, title: item.title, content: item.content })
                      }}
                    >
                      <Icon name="edit" size={22} style={{color:'#FB7900'}} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        this.createTwoButtonAlert()
                      }}
                    >
                      <Icon name="trash-alt" size={22} style={{color:'#FB7900'}} />
                    </TouchableOpacity>
                  </View>

                </View>
                ) :(
                  null
                )

              )
            }

          </ScrollView>


          <View style={styles.textInput}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
              <TextInput
                value={this.state.title}
                onChangeText={(value) => {
                  this.setState({ title: value })
                }}
                placeholder="اكتب عنوان"
                style={{ width: windowWidth * .77, height: windowHeight * .07, fontSize: 18 }}
              />
              <TextInput
                value={this.state.content}
                onChangeText={(value) => {
                  this.setState({ content: value })
                }}
                placeholder="تدوين ملاحظة"
                style={{ width: windowWidth * .77, height: windowHeight * .07, fontSize: 18 }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.select_first_photo();
              }}
            >
              <Icon name="camera" size={23} style={{ alignSelf: 'center',color:'#1B0B00',marginRight:18 }} />
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => {
                this.Add_note()
                
                this.setState({
                  title: '',
                  content: '',
                })
              }}
            >
              <Icon name="paper-plane" size={25} style={{ alignSelf: 'center',color:'#1B0B00' }} />
            </TouchableOpacity>


          </View>
        </View>




        <Modal
          visible={this.state.visible_modal}
          onRequestClose={() => {
            this.setState({ visible_modal: false, title: '', content: '' })
          }}
        >

          <StatusBar
            backgroundColor="#FF6C00"
          />
          <View style={styles.view_style_modal} >
            <Image source={require('./img/m1.png')}
              style={{ width: '15%', height: 50, resizeMode: 'contain' }}
            />
            <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#fff' }}>تعديل ملاحظة </Text>
            <TouchableOpacity
              onPress={() => {
                // this.props.navigation.goBack()
                this.setState({ visible_modal: false, title: '', content: '' })
              }}
            >
              <Icon name="arrow-left" size={23} style={{ color: '#fff' }} />
            </TouchableOpacity>
          </View>


          <View style={styles.container_modal}>
            <View style={styles.text_input_modal}>

              <TextInput style={{ fontSize: 20, textAlign: 'center' }}
                value={this.state.title}
                onChangeText={(value) => {
                  this.setState({ title: value })
                }}
              />

              <TextInput style={{ fontSize: 20 }}
                value={this.state.content}
                onChangeText={(value) => {
                  this.setState({ content: value })
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                this.change_note()
                  this.setState({title:'',content:'',visible_modal:false})

              }}
            >
              <View style={styles.save_modal}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>حفظ</Text>
              </View>
            </TouchableOpacity>

          </View>
        </Modal>

        {
          (this.state.isVisible === true) ? Splash_Screen : null
        } 

      </>
    )
  }
}
export default createAppContainer(
  createStackNavigator({
    Page1: App,
    Page2: Screen1,
  },
    {
      headerMode: 'none'
    },
    {
      initialRouteName: 'Page1'
    },
  )
)



const styles = StyleSheet.create({
  MainContainer:
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
      },
  
      SplashScreen_RootView:
      {
        justifyContent: 'center',
        flex: 1,
  
        position: 'absolute',
        width: '100%',
        height: '100%',
      },
  
      SplashScreen_ChildView:
      {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D6D4D9',
        flex: 1,
      },
      style_view: {
        width:'100%',
        height:windowHeight*.08,
        backgroundColor:'#FF5D00',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10,
  
      },
  style_view: {
    width: '100%',
    height: windowHeight * .08,
    backgroundColor: '#FB7900',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  search: {
    width: '80%',
    height: windowHeight * .062,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  container: {
    alignSelf: 'center',
    width: '100%',
    height: '89%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    width: '100%',
    height: windowHeight * .1,
    backgroundColor: '#FB7900',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 15,
    paddingBottom: 8,
    // paddingTop:8, 

  },
  style_map: {
    width: windowWidth * .92,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  style_text: {
    fontSize: 18,
    fontWeight: '900',
  },
  view_style_modal: {
    width: '100%',
    height: '8%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FB7900',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  container_modal: {
    width: '100%',
    height: '50%',
    //backgroundColor:'#ddd',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text_input_modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  save_modal: {
    width: 120,
    height: 50,
    backgroundColor: '#FB7900',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  }



}
)
// ///////////////////////////////////////////////////////////////////////////




