import React, {useEffect, useState} from 'react';
 import {
   Text,
   View,
   ScrollView,
   Image,
   Pressable
 } from 'react-native';
 
 const Item = ({name, onPress}) => {
   return(
        <View style={{width: '100%', marginTop: 20}}>
           <Pressable onPress={onPress} style={{width: '80%', flexDirection: 'row'}}>
             <View style={{width: '100%', backgroundColor: '#FBD148'}}>
                 <Text style={{fontSize: 20, marginBottom: 3, color: 'black', fontWeight: 'bold', textAlign: 'center', padding: 15}}>{name}</Text>
             </View>
             <View style={{backgroundColor: '#B2EA70', width: 50}}></View>
           </Pressable>
         </View>
   );
 }

 
 const Home = (props) => {
   const [foods, setFoods] = useState([]);
   const [display, setDisplay] = useState('flex');
   const [imageDetail, setImageDetail] = useState('');
   const [nameDetail, setNameDetail] = useState('');
   const [bahan1, setBahan1] = useState('')
   const [bahan2, setBahan2] = useState('')
   const [bahan3, setBahan3] = useState('')
   const [bahan4, setBahan4] = useState('')
   const [bahan5, setBahan5] = useState('')
   const [bahan6, setBahan6] = useState('')
   const [bahan7, setBahan7] = useState('')
   const [cara, setCara] = useState('')

   const selected = (item) => {
    setImageDetail(item.strMealThumb);
    setNameDetail(item.strMeal)
    setBahan1(item.strIngredient1);
    setBahan2(item.strIngredient2);
    setBahan3(item.strIngredient3);
    setBahan4(item.strIngredient4);
    setBahan5(item.strIngredient5);
    setBahan6(item.strIngredient6);
    setBahan7(item.strIngredient7);
    setCara(item.strInstructions)
    setDisplay('none')
 }
 const Back = () => {
   setDisplay('flex')
 }
 
   useEffect(() => {
     getData();
   }, []);
 
 
 
   const getData = () => {
     fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
     .then(response => response.json())
     .then(responseJson => {
       console.log("APi berfungsi!")
       setFoods(responseJson.meals)
     })
   }
    
 
   return(
    
     <View style={{height: '100%'}}>
       
         
          {
            display == 'flex' ? (
              <ScrollView>
                  <View style={{backgroundColor: '#FBD148', alignItems:'center'}}>
               <Image source={require('./img/logo.png')} style={{margin:20}}/>
                </View>
                  <View style={{backgroundColor: '#B2EA70', width: '60%', alignItems: 'center', position: 'relative', bottom: 20}}>
                      <Text style={{fontSize: 20, padding: 10}}>EASY MEAL RECIPES</Text>
                  </View>
                  {foods.map(food => {
                    return <Item name={food.strMeal} onPress={() => selected(food)} />
                  })}
              </ScrollView>
              
            ):
            // detail
            <ScrollView style={{backgroundColor: '#FBD148'}}>
              <Image source={{uri: imageDetail}} style={{width: '100%', height:400}}/>
              <View style={{width: '100%', flexDirection: 'row', marginTop: 65}}>
                <View style={{width: '80%', backgroundColor: 'white'}}>
                  <Text style={{fontSize: 22, marginBottom: 3, color: 'black', fontWeight: 'bold', padding: 11, marginLeft: 15}}>{nameDetail}</Text>
                </View>
                {/* tombol back */}
                <Pressable onPress={() => Back()} style={{backgroundColor: '#B2EA70', width: 50}}></Pressable>
              </View>
              <View style={{width: '100%', alignItems: 'center', marginTop: 35}}>
                  <View style={{width: '90%', backgroundColor: 'white', alignItems: 'center', borderRadius: 10}}>
                    <View style={{width: '80%'}}>
                      <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 40, marginBottom: 25}}>INGREDIENTS</Text>
                      <Text style={{marginBottom: 5}}>1.{bahan1}</Text>
                      <Text style={{marginBottom: 5}}>2.{bahan2}</Text>
                      <Text style={{marginBottom: 5}}>3.{bahan3}</Text>
                      <Text style={{marginBottom: 5}}>4.{bahan4}</Text>
                      <Text style={{marginBottom: 5}}>5.{bahan5}</Text>
                      <Text style={{marginBottom: 5}}>6.{bahan6}</Text>
                      <Text style={{marginBottom: 30}}>7.{bahan7}</Text>
                    </View>
                  </View>
              </View>
              <View style={{width: '100%', alignItems: 'center', marginTop: 35, marginBottom: 35}}>
                  <View style={{width: '90%', backgroundColor: 'white', alignItems: 'center', borderRadius: 10}}>
                    <View style={{width: '80%'}}>
                      <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 40, marginBottom: 25}}>HOW TO MAKE IT</Text>
                      <Text style={{marginBottom: 30}}>{cara}</Text>
                    </View>
                  </View>
              </View>
              
            </ScrollView>
          }
          {/* end of detail */}
            
     </View>
   );
 }
 
 
 export default Home;