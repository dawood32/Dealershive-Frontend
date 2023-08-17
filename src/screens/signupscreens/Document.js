import React,{useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text,View,Pressable,TextInput,FlatList} from 'react-native';
import { AppImages } from '../../components/AppImages';

const Document=({navigation})=>{
    const documentscreen=()=>{
        navigation.navigate('DocumentVerify')

    }
      




    return(
        <View style={styles.mainContainer}>
            <ImageBackground
            source={AppImages.Loginbackground}
            style={styles.imgbackground}>
        <View style={styles.header}>
            <View style={styles.headrcomp}>
            <Text style={styles.welcome}>Welcome!</Text>
            <Text style={styles.accessAccount}>Please enter your email to register your account.</Text>
            <View style={styles.loginview}>
          <Pressable 
        
          
          style={styles.signupview}>
            <Text style={styles.signup}>Sign Up</Text>
          </Pressable>
          <Pressable 
        //   onPress={loginscreen}
          style={styles.login}>
            <Text style={styles.logintext}>Login</Text>
          </Pressable>
        </View>
        <View style={styles.progressview}>
        <View style={styles.progressCircle}>
<View style={styles.inside}/>
        </View>
        <View style={styles.horizontalLine}/>
        <View style={styles.otpcircle}/>
       
        <View style={styles.horizontalLine}/>
        <View style={styles.otpcircle}/>
        
        </View>
        <View style={styles.progresstext}>
            <Text style={styles.sign}>Sign Up</Text>
            <Text style={styles.otp}>OTP</Text>
            <Text style={styles.otp}>Document Veri..</Text>

        </View>
        </View>
        </View>
        <View style={styles.middleContainer}>
            <Text style={{color:'#111B31',fontSize:18,fontFamily:"Nunito-Bold",top:10}}>Upload your documents</Text>
            <Text style={{textAlign:"center",color:'#838FA0',fontFamily:"Nunito-Medium"}}>please submit your documents to support@dealershive.com or on our whatsapp in order to review your account for validation</Text>
            <View style={{backgroundColor:"#FFF4E3",padding:20,borderRadius:10}}>
<Text style={{textAlign:"center",color:'#6D7989',fontFamily:"Nunito-Medium",lineHeight:22}}> Please note that this process may take some time, but we will notify you as soon as your documents have been validated. We appreciate your patience and understanding.</Text>
        </View>
        
        </View>
        <View style={styles.bottomContainer}>
        <Pressable 
        onPress={documentscreen}
          style={styles.loginview1}>

            <Text style={styles.login1}>Continue to Upload Documents</Text>
          </Pressable>

</View>
        </ImageBackground>
        </View>
    )
}


const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#F5F5F5"
      
    },
    imgbackground:{
        width:'100%',
        height:'100%'
    },
    progressCircle:{
        width:24,
        height:24,
        backgroundColor:'#EA8C00',
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center"
    },
    inside:{
        width:14,
        height:14,
        borderRadius:30,
        backgroundColor:"#FFFFFF"
    },
    horizontalLine:{
        borderBottomWidth:2,
        width:'30%',
        alignSelf:'center',
        marginHorizontal:8,
        borderColor:'#D9D9D9'
    },
    otpcircle:{
        width:24,
        height:24,
        borderRadius:30,
        backgroundColor:"#D9D9D9"
    },
    header:{
        flex:2,
        justifyContent:'flex-end',
        paddingHorizontal:30
    },
    middleContainer:{
        flex:1.7,
        paddingHorizontal:30,
         justifyContent:"space-evenly",
        // backgroundColor:"lightblue",
        alignItems:'center'
    },
    bottomContainer:{
        flex:1,
        paddingHorizontal:30,
        alignItems:'center'
    },
    loginview: {
        width: '100%',
        height: 60,
        borderRadius: 70,
        borderWidth: 1,
        padding: 7,
        flexDirection: 'row',
        borderColor: 'solid rgba(159, 159, 159, 0.3)',
        marginTop: 20,
        alignItems: 'center',

       
      },
      loginview2: {
        width: '100%',
        height: 62,
        borderRadius: 50,
        borderWidth: 1,
        padding: 7,
        flexDirection: 'row',
        borderColor: 'solid rgba(159, 159, 159, 0.3)',
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
      },
      signupview: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EA8C00',
        borderRadius: 40,

      },
      signup: {
        fontSize:12,
        color: '#FFF',
        fontFamily:'Nunito-Bold'
      
     
    
      },
      login: {
        width: '50%',
        height: '100%',
     
        justifyContent: 'center',
        alignItems: 'center',
      },
      logintext: {
        color: '#838FA0',
        fontFamily:'Nunito-Medium'
        
      },
      welcome:{
        textAlign:'center',
        color:'#111B31',
        fontSize:32,
        fontFamily:'Nunito-Bold'
      },
      accessAccount:{
        textAlign:"center",
        color:'#838FA0',
        fontFamily:'Nunito-Medium',
        lineHeight:22


      },
      loginview1: {
        width: '100%',
        height: 60,
        borderRadius: 70,
        borderWidth: 1,
        padding: 7,
        flexDirection: 'row',
        borderColor: 'rgba(159, 159, 159, 0.3)',
         marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#19242C',
        paddingHorizontal: 20,
        
        position:"relative",
        top:0,
        left:0,
        right:0,
   
      
      },
      login1: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily:'Nunito-Bold'
    
      },
      textinput: {
        width: '90%',
        color:"#424243"
      

      },
      sign:{
        fontSize:12,
        // fontFamily:'Nunito',
        color:"#000000"

      },
      otp:{
color:'#838FA0',
fontFamily:'Nunito-Medium'

      },
      headrcomp:{
        height:"78%",
        justifyContent:"space-between",
    },
    progressview:{
        flexDirection:"row",
        justifyContent:"center"
    },
    progresstext:{
        alignItems:'center',
        justifyContent:"space-between",
        flexDirection:'row'
    },
    iconsubcontainer: {
        width: '66%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
      iconView: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'rgba(159, 159, 159, 0.2)',
        marginTop: 20,
      },
      loginwith: {
        marginTop: 20,
        alignSelf: 'center',
        color: '#838FA0',
        fontFamily:'Nunito-Medium'
    
      },
      rightformat:{
        width:'90%',
        textAlign:'right',
        fontSize:12,
        color:'#CD1B1B',lineHeight:16,
        fontFamily:'Nunito-Medium'
      },
      emailformat:{
        alignItems:'flex-end',
        marginTop:8
      }
})
export default Document