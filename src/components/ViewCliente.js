/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

// import { Container } from './styles';
import { Modal, Button } from 'react-bootstrap';

export default class components extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>NOME</th>
                                    <th>EMAIL</th>
                                    <th>ENDEREÇO</th>
                                    <th>TELEFONE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.dataCliente[0]}</td>
                                    <td>{this.props.dataCliente[1]}</td>
                                    <td>{this.props.dataCliente[2]}</td>
                                    <td>{this.props.dataCliente[3]}</td>
                                    <td>{this.props.dataCliente[4]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Sair</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }
}
