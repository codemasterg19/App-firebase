import { Alert, Button, FlatList, ImageBackground, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
//FIREBASE
import { db } from '../config/Config'
import { onValue, ref, remove, set, update } from "firebase/database";
import { Card, Paragraph, Title } from 'react-native-paper';
import Tarjeta from './Tarjeta';

export default function UsuarioScreen() {
  const [cedula, setcedula] = useState("")
  const [nombre, setnombre] = useState("")
  const [correo, setcorreo] = useState("")
  const [comentario, setcomentario] = useState("")

  const [lista, setlista] = useState([])
  const [visible, setvisible] = useState(false)
  ////////////// GUARDAR ///////////

function guardarUsuario(cedula: string, nombre:string, correo:string, comentario:string) {
  
  try {
    set(ref(db, 'usuasrios/' + cedula), {
      name: nombre,
      email: correo,
      coment : comentario
    });
    Alert.alert('Mensaje', 'Usuario Almacenado')

  } catch (error) {
    console.log(error);
  }

  setcedula('')
  setnombre('')
  setcorreo('')
  setcomentario('')
}

///////////////////////// LEER //////////////////

function leer(){
  const starCountRef = ref(db, 'usuasrios/');  //linea ruta para leer datos
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);

  //CAMBIO DE FORMATO DE LOS DATOS
  const listaTemp:any =Object.keys(data).map((cedula)=>({
    key: cedula, ...data[cedula]
  }))

  console.log(listaTemp);
  setlista(listaTemp)
  
});
}

useEffect(() => {
  leer()
}, [])

////////////////////////////EDITAR//

function editar(id: string){
  update(ref(db, 'usuasrios/' + id), {
    name: nombre,
    email: correo,
    coment : comentario
  });

setcedula('')
setnombre('')
setcorreo('')
setcomentario('')
setvisible(false);
leer();

}

////////////////////////////EDITAR 2 CARGA DATOS//

function editar2(item: any){
setcedula(item.key)
setnombre(item.name)
setcorreo(item.email)
setcomentario(item.coment)

setvisible(true);


}

////////ELIMINAR///

function eliminar(id: string){
  remove(ref(db, 'usuasrios/' + id))
  .then(() => {
    Alert.alert('Mensaje', 'Usuario Eliminado');
    leer(); // Volver a leer los datos para actualizar la lista
  })
  .catch((error) => {
    console.log(error);
  });
  
}


type Usuario ={
  name: string,
  email: string,
  coment: string,
  key: string

}

  return (
    <View style={styles.container}>
      <Text>-USUARIOS-</Text>
      <TextInput
        placeholder='Ingrese Cédula'
        style={styles.txt}
        keyboardType='numeric'
        onChangeText={(texto)=>setcedula(texto)}
        value={cedula}
      />
      <TextInput
        placeholder='Ingrese Nombre'
        style={styles.txt}
        onChangeText={(texto)=>setnombre(texto)}
        value={nombre}
      />
      <TextInput
        placeholder='Ingrese Correo'
        style={styles.txt}
        keyboardType='email-address'
        onChangeText={(texto)=>setcorreo(texto)}
        value={correo}
      />
      <TextInput
        placeholder='Ingrese Comentario'
        style={styles.txtA }
        onChangeText={(texto)=>setcomentario(texto)}
        multiline
        value={comentario}
      />
      <View style={styles.buttonContainer}>
        {!visible && (
          <Button title='GUARDAR' onPress={() => guardarUsuario(cedula, nombre, correo, comentario)} />
        )}
        {visible && (
          <Button title='EDITAR' onPress={() => editar(cedula)} />
        )}
      </View>
      <FlatList
        data={lista}
        renderItem={({item}:{item:Usuario})=>
         //   <Card style={styles.card}>
        //<Card.Content>
         // <Title>{item.name}</Title>
         // <Paragraph>{item.email}</Paragraph>
         // <Paragraph>{item.coment}</Paragraph>
       // </Card.Content>
     // </Card>
     <View style={styles.card}>
      <Tarjeta  data={item}/>
      
      <Button title='Editar' color={'#3fbcd5'} onPress={ ()=> editar2(item)} />
      <Button title='Eliminar' color={'#cd1504'} onPress={ ()=> eliminar(item.key)} />
      
     </View>
        }
      />
      <StatusBar
      backgroundColor='white'
      barStyle='dark-content'
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#055f8f'
      },
      txt: {
        backgroundColor: '#E0F7FA',
        height: 35,
        width: '80%',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
      },
      txtA: {
        backgroundColor: '#E0F7FA',
        height: 70,
        width: '80%',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
      },
      buttonContainer: {
        marginTop: 20,
        width: '60%',
        borderRadius: 10,
        overflow: 'hidden',
      },
      listItem: {
        backgroundColor: '#0288D1',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        width: '100%',
      },
      texto: {
        fontSize: 16,
        color: '#055f8f',
      },
      card: {
        
        backgroundColor: '#8be9e1',
        marginVertical: 10,
        width: '100%',
        justifyContent: 'center',
        
        shadowColor: '#19398f',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,

      },

      btn:{
        flexDirection: 'row',
        justifyContent: 'center', 
        
        
      }
    })
    