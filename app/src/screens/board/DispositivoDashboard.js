import React, { useState, useEffect, Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import DataTable from 'react-data-table-component';
import { Content, Form, Item, Input, Label, Button, Icon } from 'native-base';

import axios from "axios";

export default function DispositivoDashboard({ navigation }) {
  var [dados, setDados] = useState([]);
  var header = new Headers();
  header.append("Access-Control-Allow-Origin", "*")

  useEffect(() => {
    axios.get("http://localhost:8080/dispositivo/listar", header)
      .then((resposta) => {
        setDados(resposta.data)
        console.log(dados)
      })
  }, []);

  function AdicionarDispositivo() {

    navigation.navigate("AddDispositivo")
  }


  const colunas = [
    {
      name: "Nome",
      selector: "nome",
      sortable: true
    },
    {
      name: "IMEI",
      selector: "imei",
      sortable: true
    },
    {
      name: "Modelo",
      selector: "modelo",
      sortable: true,
      right: true
    }
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={true} style={styles.conteudo}>
        <DataTable
          title="Dispositivos"
          columns={colunas}
          data={dados}
          pagination
        />
      </TouchableOpacity>

      {/*  <TouchableOpacity style={styles.addDispositivo} onPress={AdicionarDispositivo}>
        <Text>Adicionar Dispositivo</Text>
      </TouchableOpacity> */}

      <Button block primary iconLeft style={styles.submitBtn} onPress={AdicionarDispositivo}>
        <Icon name='add' />
        <Text>Adicionar Dispositivo</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffefd5",
  },
  conteudo: {
    marginTop: -220
  },
  
  submitBtn: {
  marginTop: 20
  },
  addDispositivo: {

  borderRadius: 2,
  margin: 10,
  backgroundColor: "#00ffff",
  paddingLeft: 10,
  paddingRight: 10,
  height: 40,
  width: 235,
  textAlign: "center",
  fontSize: 30,

  fontWeight: "800",
  color: "black",
  borderRadius: 7

}
});
