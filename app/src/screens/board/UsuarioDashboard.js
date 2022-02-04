import React, { useState, useEffect, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DataTable from 'react-data-table-component';
import axios from "axios";
import { Content, Form, Item, Input, Label, Button, Icon } from 'native-base';

export default function UsuarioDashboard({ navigation }) {
  var [dados, setDados] = useState([]);
  var header = new Headers();
  header.append("Access-Control-Allow-Origin", "*")

  useEffect(() => {
    axios.get("http://localhost:8080/usuario/listar", header)
      .then((resposta) => {
        setDados(resposta.data)
        console.log(dados)
      })
  }, []);

  function AdicionarUsuario() {

    navigation.navigate("AddUsuario")
  }

  const colunas = [
    {
      name: "Nome",
      selector: "nome",
      sortable: true
    },
    {
      name: "Nome de usuário",
      selector: "nomeUsuario",
      sortable: true
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      right: true
    }
  ];

  return (
    <View style={styles.container}>

      <TouchableOpacity disabled={true} style={styles.conteudo}>
        <DataTable
          style={styles.tabela}
          title="Usuários"
          columns={colunas}
          data={dados}
          pagination
        />
      </TouchableOpacity>

     {/*  <TouchableOpacity style={styles.addUsuario} onPress={AdicionarUsuario}>
        <Text>Adicionar Usuario</Text>
      </TouchableOpacity>
 */}
      <Button block primary iconLeft style={styles.submitBtn} onPress={AdicionarUsuario}>
        <Icon name='add' />
        <Text>Adicionar Usuario</Text>
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
  addUsuario: {

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
