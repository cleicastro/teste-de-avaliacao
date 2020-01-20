Este projeto foi desenvolvido com bootstrapped [Create React App](https://github.com/facebook/create-react-app).


### Como Funciona a Aplicação

A aplicação gerência os clientes de um sistema comercial, através da API do Firebase 'Cloud Firestone'.
O sistema fornece detalhes do cadastro dos clientes, apenas selecionando e clicando na linha do respesctivo cliente. Ele também disponibiliza um mecanismo de pesquisa pelos campos de ID, NOME ou EMAIL, após o pause de 1500 milissegundos da digitação do usuário, o sistema realiza uma consulta no Database Cloud Firestone ferramenta do Firebase, no qual o sistema é integrado.
As permissões do Usuário são definidas apenas para realizar consultas e inserção de novos clientes, com o google analytics integrado obtendo informações e ações de como o usuário se comporta.

### Requisitos
Node
NPM
React

### Getting started

Abra o terminal e digite:

### `git clone https://github.com/cleicastro/teste-de-avaliacao`

Agora que você clonou o projeto para o seu computador, será necessário instalar todas as dependências para a aplicação rodar diretamente no localhost. Para isso, digite o comando abaixo e espere a instalação terminar:

### `npm install`

Com a aplicação clonada e todas as dependências instaladas você pode executar o comando abaixo para iniciar a aplicação:

### `npm start`

1.  `npm start` para iniciar o servidor de desenvolvimento (ou `yarn start`, se não estiver usando o npm).
1.  `open http://localhost:3000/` para abrir o site no seu navegador favorito.

## Scripts disponíveis 

No diretório do projeto, você pode executar:

### `yarn start`

Executa o aplicativo no modo de desenvolvimento.<br />
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador

A página será recarregada se você fizer edições.<br />
Você também verá erros no console.

### `yarn test`

Inicia o corredor de teste no modo de observação interativo.<br />
Veja a seção sobre [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `yarn build`

Cria o aplicativo de produção para o diretório `build`.<br />
Agrupa corretamente o React no modo de produção e otimiza a construção para obter o melhor desempenho.

A compilação é otimizada e os nomes de arquivos incluem os hashes.<br />
Seu aplicativo está pronto para ser implantado!

Veja a seção sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.
