import { Alert, Button, FlatList, ImageBackground, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
//FIREBASE
import { db } from '../config/Config'
import { onValue, ref, set } from "firebase/database";
import { Card, Paragraph, Title } from 'react-native-paper';

export default function UsuarioScreen() {
  const [cedula, setcedula] = useState("")
  const [nombre, setnombre] = useState("")
  const [correo, setcorreo] = useState("")
  const [comentario, setcomentario] = useState("")

  const [lista, setlista] = useState([])

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

type Usuario ={
  name: string,
  email: string,
  coment: string

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
      <Button title='GUARDAR' onPress={()=> guardarUsuario(cedula,nombre,correo,comentario)}
        />
        </View>
      <FlatList
        data={lista}
        renderItem={({item}:{item:Usuario})=>
            <Card style={styles.card}>
        <Card.Content>
          <Title>{item.name}</Title>
          <Paragraph>{item.email}</Paragraph>
          <Paragraph>{item.coment}</Paragraph>
        </Card.Content>
      </Card>
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
        borderRadius: 10,
        shadowColor: '#19398f',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
      }
    })
    