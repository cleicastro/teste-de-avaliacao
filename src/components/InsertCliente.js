import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';

// import { Container } from './styles';

export default class ui extends Component {
    constructor() {

        super();
        this.ref = firebase.firestore().collection('cliente');

        this.state = {
            nome: '',
            email: '',
            endereco: '',
            telefone: ''
        };

    }

    render() {
        const { nome, email, endereco, telefone } = this.state;
        return (
            <div>
                <div className="modal" id="cadCliente" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Novo Cliente</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.onSubmit}>
                            <div className="modal-body">                                
                                    <div className="form-group">
                                        <input type="text" name="nome" required value={nome} onChange={this.onChange} className="form-control" id="nome" placeholder="Nome" />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="email" required value={email} onChange={this.onChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Seu email" />
                                        <small id="emailHelp" className="form-text text-muted">Nunca vamos compartilhar seu email, com ninguém.</small>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="endereco"  value={endereco} onChange={this.onChange} className="form-control" id="endereco" placeholder="Endereço" />
                                    </div>
                                    <div className="form-group">
                                        <input type="tel" name="telefone"  value={telefone} onChange={this.onChange} className="form-control" id="telefone" placeholder="Telefone" />
                                    </div>                                
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                    <button type="release" className="btn btn-secondary" data-dismiss="modal">Sair</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { nome, email, endereco, telefone } = this.state;
        console.log("data: ", { nome, email, endereco, telefone });
        this.ref.add({
            nome,
            email,
            endereco,
            telefone
        }).then((docRef) => {
            this.setState({
                nome: '',
                email: '',
                endereco: '',
                telefone: ''
            });
            //this.history.push("/")
            //this.history.push('/target')
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}
