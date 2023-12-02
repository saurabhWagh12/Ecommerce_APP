import { StyleSheet, View, Image,Text,TouchableOpacity } from 'react-native';
import React, { useContext,useState } from 'react';
import VolleyBall from './Images/volleyball.jpeg';
import { Button } from '@rneui/themed';
import UserContext from './context/UserContext';
import axios from 'axios';
import MainContainer from './MainContainer';

const Card = (props) => {
  const {backendURL} = useContext(UserContext);
  const urlImage = backendURL+'/static'+props.image;
  const {total,setTotal} = useContext(UserContext);

  const [quantity, setQuantity] = useState(props.quantity);


  async function ReduceQuantity(id){
    try {
        const response = await axios.get(backendURL+`/reducequantity/${id}/`);
        if(response.data.status===200){
            // console.log(response.data.quantity)
            setQuantity(response.data.quantity)
            const value = total-props.price;
            setTotal(value)
            
        }else{
            alert('error')
        }
    } catch (error) {
        console.log(error)
    }
 
  }

  async function IncreaseQuantity(id){
    try {
        const response = await axios.get(backendURL+`/increasequantity/${id}/`);
        if(response.data.status===200){
            setQuantity(response.data.quantity)
            const value = total+props.price;
            setTotal(value)
        }else{
            alert('error')
        }
    } catch (error) {
        console.log(error)
    }
 
  }

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

      <View >
        <Text style={[{fontSize:17,fontWeight:'500',textAlign:'center',paddingVertical:15}]}>₹ {props.price}</Text>
      </View>

      <View style={[{flexDirection:'row',gap:15,justifyContent:'center',alignItems:'center'}]}>
        
        <TouchableOpacity style={styles.IncDec} onPress={()=>{ReduceQuantity(props.id)}}>
        <Text style={[{textAlign:'center',fontSize:15,color:'#fff',fontWeight:'700'}]}>-</Text>
        </TouchableOpacity>
        
        <Text style={[{fontSize:17,fontWeight:'500',textAlign:'center',paddingVertical:15}]}>{quantity}</Text>
        
        <TouchableOpacity style={styles.IncDec} >
        <Text style={[{textAlign:'center',fontSize:15,color:'#fff',fontWeight:'700'}]} onPress={()=>{IncreaseQuantity(props.id)}}>+</Text>
        </TouchableOpacity>
      
      </View>

         </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginVertical:10,
    backgroundColor: '#fff', 
    width: '100%',
    height: '100%',
    flex:1,
    flexDirection:'row',

    // justifyContent:'space-between',
    paddingHorizontal:10,
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
    // paddingHorizontal:10,
    textAlign:'center',
    fontWeight:'500'
  },
  // For Small Increment and Decrement Buttons:
  IncDec:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'tomato',
    width:20,
    height:20,
    fontWeight:'700',
    elevation:15,
    borderRadius:5,
  }

});
