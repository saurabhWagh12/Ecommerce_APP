import { StyleSheet, View, Image,Text,TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@rneui/themed';
import UserContext from './context/UserContext';
import ProductPage from './ProductPage';
import Modal from 'react-native-modal';

const Card = (props) => {
  const {backendURL} = useContext(UserContext);
  const [openPage,setOpenPage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const urlImage = backendURL+'/static'+props.image;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const buttonClicked = () => {
    console.log('Clicked');
    try {
      if (openPage) {
        setOpenPage(false);
      } else {
        setOpenPage(true);
        toggleModal(); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      
      <Image
        source={{ uri: urlImage }} 
        style={styles.image}
      />
      <View style={[{flexDirection:'column',paddingRight:10}]}>
      <View style={styles.textContainer}>
        <Text style={styles.productName}>{props.name}</Text>
      </View>

      <View style={[]}>
        <Text style={[{fontSize:17,fontWeight:'500',textAlign:'center',paddingVertical:15}]}>₹ {props.price}</Text>
      </View>

        <TouchableOpacity style={[{justifyContent:'center',alignItems:'center',backgroundColor:"tomato",width:130,height:30,borderRadius:30,elevation:10,marginLeft:20}]} onPress={()=>{buttonClicked()}} ><Text style={[{color:'#fff',fontWeight:'700',fontSize:15}]} >Buy Now</Text></TouchableOpacity>
      </View>


      {/* Modal Window Code */}
      <Modal isVisible={isModalVisible} backdropColor="white" backdropOpacity={1}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
            
          <ProductPage id={props.id} />
          
        </View>
      </Modal>
      
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal:5,
    marginVertical:10,
    backgroundColor: '#fff', 
    width: '100%',
    height: '100%',
    flex:1,
    flexDirection:'row',
    elevation:10,
    borderRadius:30,
  },

  image:{
    width:180,
    height:180,
    borderRadius:30,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  textContainer:{
    flexShrink:1,
    margin:3,
  },
  productName:{
    fontSize:20,
    paddingVertical:10,
    textAlign:'center',
    fontWeight:'500'
  },

  closeButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: 'tomato',
    paddingVertical: 10,
    paddingHorizontal:15,
    borderRadius: 100,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
