import React, { useState, useEffect, Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import DataTable from 'react-data-table-component';
import axios from "axios";
import { Content, Form, Item, Input, Label, Button, Icon } from 'native-base';

export default function ProdutoDashboard({ navigation }) {
  var [dados, setDados] = useState([]);
  var header = new Headers();
  header.append("Access-Control-Allow-Origin", "*")

  useEffect(() => {
    axios.get("http://localhost:8080/produto/listar", header)
      .then((resposta) => {
        setDados(resposta.data)
        console.log(dados)
      })
  }, []);



  function AdicionarProduto() {

    navigation.navigate("AddProduto")
  }


  const colunas = [
    {
      name: "Nome",
      selector: "nome",
      sortable: true
    },
    {
      name: "Categoria",
      selector: "categoria",
      sortable: true
    },
    {
      name: "Quantidade",
      selector: "quantidade",
      sortable: true,
      right: true
    },
    {
      name: "Estoque",
      selector: "estoque",
      sortable: true,
      right: true
    }
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={true} style={styles.conteudo}>
        <DataTable
          title="Produtos"
          columns={colunas}
          data={dados}
          pagination
        />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.addProduto} onPress={AdicionarProduto}>
        <Text>Adicionar Produto</Text>
      </TouchableOpacity> */}

      <Button block primary iconLeft style={styles.submitBtn} onPress={AdicionarProduto}>
        <Icon name='add' />
        <Text>Adicionar Produto</Text>
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
    marginTop: -220,
    width: "95%"
  },
  
  submitBtn: {
    marginTop: 20
  },
  addProduto: {

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
