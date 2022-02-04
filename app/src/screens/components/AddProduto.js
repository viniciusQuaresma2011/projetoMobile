import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';

export default class AddProduto extends Component {
    constructor() {
        super();

        this.state = {
            nome: '',
            categoria: '',
            quantidade: '',
            estoque: ''
        }
    }

    validateEmail = (nome) => {
        const regex = /^[a-z._-]+@[a-z.-]+\.[a-z]{2,4}$/;

        if (nome == "") {
            return false
        } else {
            return regex.test(nome);
        }
    }

   /*  validatePhone = (phone) => {
        const regex = /^\+?[0-9]*$/;

        if (phone == "") {
            return false
        } else {
            return regex.test(phone);
        }
    } */

    formSubmit = () => {
        const vm = this;

        if (this.state.nome == "") {
            alert('Favor digite o nome!')
        } else if (this.validateEmail(this.state.categoria) == false) {
            alert('Favor digite a categoria!')
        }else if (this.validateEmail(this.state.quantidade) == false) {
            alert('Favor digite a quantidade!')
        }else if (this.validateEmail(this.state.estoque) == false) {
            alert('Favor digite o estoque!')
        } else {
            axios.post('http://localhost:8080/produto/cadastrar', vm.state)
                .then(function (response) {
                    const data = response.data;

                    alert(data.msg);
                    vm.props.navigation.dispatch(
                        vm.props.navigation.goBack()
                    )
                })
                .catch(function (err) {
                    alert(err)
                })
        }
    }

    render() {
        return (
            <Content>
                <Form style={styles.formOuter}>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Nome</Label>
                        <Input
                            onChangeText={(nome) => this.setState({ nome })}
                            value={this.state.nome}
                        />
                    </Item>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Categoria</Label>
                        <Input
                            onChangeText={(categoria) => this.setState({ categoria })}
                            value={this.state.categoria}
                        />
                    </Item>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Quantidade</Label>
                        <Input
                            onChangeText={(quantidade) => this.setState({ quantidade })}
                            value={this.state.quantidade}
                        />
                    </Item>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Estoque</Label>
                        <Input
                            onChangeText={(estoque) => this.setState({ estoque })}
                            value={this.state.estoque}
                        />
                    </Item>
                    <Button block primary iconLeft style={styles.submitBtn} onPress={this.formSubmit.bind(this)}>
                        <Icon name='add' />
                        <Text>Adicionar</Text>
                    </Button>
                </Form>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    formOuter: {
        flex: 1,
        padding: 8,
        backgroundColor: "#ffefd5",
    },
    formInput: {
        marginLeft: 0
    },
    submitBtn: {
        marginTop: 20
    }
});