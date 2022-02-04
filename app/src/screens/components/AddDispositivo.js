import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';

export default class AddDispositivo extends Component {
    constructor() {
        super();

        this.state = {
            nome: '',
            imei: '',
            modelo: '',
            
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
        } else if (this.validateEmail(this.state.imei) == false) {
            alert('Favor digite o imei!')
        }else if (this.validateEmail(this.state.modelo) == false) {
            alert('Favor digite o modelo!')
        
        } else {
            axios.post('http://localhost:8080/dispositivo/cadastrar', vm.state)
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
                        <Label>IMEI</Label>
                        <Input
                            onChangeText={(imei) => this.setState({ imei })}
                            value={this.state.imei}
                        />
                    </Item>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Modelo</Label>
                        <Input
                            onChangeText={(modelo) => this.setState({ modelo })}
                            value={this.state.modelo}
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