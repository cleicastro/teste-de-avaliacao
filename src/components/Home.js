import React, { Component } from 'react';

// import { Container } from './styles';
import * as firebase from 'firebase';
import 'firebase/firestore';
import ViewCliente from './ViewCliente';

export default class components extends Component {

  constructor(props) {
    super(props)

    /*
      INTEGRAÇÃO TOTAL COM O FIREBASE E GOGOLE ANALYCTIS
      AUTENTICAÇÃO DO DATABASE CLOUD FIRESTONE PÚBLICO
      LISTA O DOCUMENTO 'Cliente' E ARMAZENA NO OBJETO 'data'
      FUNCIONALIDADES: INSERIR, CONSULTAR E ORDENAR OS CLIENTES
    */
    const firebaseConfig = {
      apiKey: "AIzaSyCZHMVMMvvtySrvsJaXxYTKkSUesmfibEE",
      authDomain: "teste-de-avaliacao.firebaseapp.com",
      databaseURL: "https://teste-de-avaliacao.firebaseio.com",
      projectId: "teste-de-avaliacao",
      storageBucket: "teste-de-avaliacao.appspot.com",
      messagingSenderId: "441640645476",
      appId: "1:441640645476:web:0adf1827759b111ddcc071",
      measurementId: "G-8SGR1EWZDR"
    };
    this.app = firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const db = this.app.firestore();
    this.ref = db.collection('cliente');
    this.unsubscribe = null;

    //this.ConsultaChange = this.ConsultaChange.bind(this);

    this.state = {
      data:             [],
      parseDataCliente: [],
      addModalShow:     false,
      digitando:        false,
      pauseDIgitando:   0,
      id:               'ID',
      nome:             'NOME',
      email:            'EMAIL',
      order:            'asc'
    }
    
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onUpdateCliente);
  }

  //campo de filtro 'nome'
  ConsultaChange = (event) => {    
    const vm = this;
    var valor = event.target.value;
    var nomeCampo = event.target.name;
    // verifica o pause da digitação para realizar a consulta no firebase
    if (this.state.pauseDIgitando) {
      clearTimeout(vm.state.digitando);
    }    
      vm.setState({
        value: valor,
        digitando: false,
        pauseDIgitando: setTimeout(function () {
          //vm.onGetClienteOFF(vm.state.value, 'nome')
          switch (nomeCampo) {
            case 'id':
              vm.onGetCliente(valor, 'id');
              break;
  
            case 'nome':
              vm.onGetCliente(valor, 'nome')
              console.error('Valor', valor);
              break;
  
            case 'email':
              vm.onGetCliente(valor, 'email');
              break;
  
            default:
              console.error('Erro', 'Campo não configurado para consulta');            
              break;
          }        
        }, 1500)
      }); 
    
  }
    
  render() {
    let addModalClosed =() => this.setState({addModalShow : false});
    return (
      <div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>{this.state.id}</th>
                  <th>{this.state.nome}</th>
                  <th>{this.state.email}</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        <form className="form">
          <div className="form-row">
            <div className="col-sm-4">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="icon ion-md-search"></i></div>
                </div>
                <input type="text" name="id"  onChange={this.ConsultaChange} className="form-control" id="BUSCAID" placeholder="ID" />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="icon ion-md-search"></i></div>
                </div>
                <input type="text" name="nome"  onChange={this.ConsultaChange} className="form-control" id="BUSCANOME" placeholder="NOME" />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="icon ion-md-search"></i></div>
                </div>
                <input type="text" name="email"  onChange={this.ConsultaChange} className="form-control" id="BUSCAEMAIL" placeholder="EMAIL" />
              </div>
            </div>

          </div>
        </form>

        <div className="row mt-4">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr style={{cursor: 'pointer'}}>
                  <th onClick={()=> this.onOrder('doc')}>ID</th>
                  <th onClick={()=> this.onOrder('nome')}>NOME</th>
                  <th onClick={()=> this.onOrder('email')}>EMAIL</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(data =>
                  <tr style={{cursor:'pointer'}} onClick={()=> this.modalCliente([data.key, data.nome, data.email, data.endereco, data.telefone])}>
                    <td>{data.key}</td>
                    <td>{data.nome}</td>
                    <td>{data.email}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <ViewCliente
          show={this.state.addModalShow}
          onHide={addModalClosed}
          dataCliente = {this.state.parseDataCliente}
        ></ViewCliente>
      </div>
    );
  }

  //Busca no firebase database firestone
  onGetCliente = (dataGet, coluna) => {
    let doc = this.ref.where(coluna, '==', dataGet);
    const data = [];    
    doc.onSnapshot(docSnapshot => {
      //console.log(`Received doc snapshot: ${docSnapshot.data}`);
      docSnapshot.forEach((doc) => {
        const { nome, email } = doc.data();
        data.push({
          key: doc.id,
          doc, // DocumentSnapshot
          nome,
          email
        });

        console.log('busca', doc.data());    
      });
      if(data.length > 0){
        this.setState({
          //data
          id:   data[0].key,
          nome: data[0].nome,
          email:data[0].email
        });
      }
      
      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }
  //Order list
  onOrder = (coluna) => {
    let doc = this.ref.orderBy(coluna, this.state.order);
    const data = [];    
    doc.onSnapshot(docSnapshot => {
      //console.log(`Received doc snapshot: ${docSnapshot.data}`);
      docSnapshot.forEach((doc) => {
        const { nome, email, endereco, telefone } = doc.data();
        data.push({
          key: doc.id,
          doc, // DocumentSnapshot
          nome,
          email,
          endereco,
          telefone
        });

        console.log('busca', doc.data());    
      });
      if(data.length > 0){
        this.setState({
          data          
        });
      }
      if(this.state.order === 'asc'){
        this.setState({
          order: 'desc'
        })
      }else{
        this.setState({
          order: 'asc'
        })
      }
      
      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  onUpdateCliente = (querySnapshot) => {    
    const dataSet = [];
    querySnapshot.forEach((doc) => {
      const { nome, email, endereco, telefone } = doc.data();
      dataSet.push({
        key: doc.id,
        doc, // DocumentSnapshot
        nome,
        email,
        endereco,
        telefone
      });
    });
    this.setState({
      data: dataSet
    });
  }

  modalCliente = (clienteArray) =>{
    this.setState({addModalShow: true})
    this.setState({parseDataCliente: clienteArray})
  }

}
