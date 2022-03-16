# Levantamento de requisitos da aplicação

No processo de desenvolvimento, o analista, a ponte entre o cliente e programadores, faz o levantamento das funcionalidades do projeto.

Do outro lado, os desenvolvedores precisam extrair os Requisitos Funcionais (funcionalidades), Requisitos Não Funcionais (como ferramentas necessarias para criação do aplicação) e as Regras de Negocio (como devem ser tratadas as funcionalidades de forma detalhada)

## Cadastro de carro

**RF**
Deve ser possivel cadastrar um novo carro
Deve ser possivel listar todas as categorias

**RN**
Não deve ser possivel cadastrar um carro com um placa ja existente
Não deve ser possivel alterar a placa de um carro já cadastrado
O carro deve ser cadastrado, por padrão, com disponibilidade
O usuario responsavel pelo cadastro deve ser um usuario administrador

## Listagem de carros

**RF**
Deve ser possivel listar todos os carros disponiveis
Deve ser possivel listar todos os carros disponiveis pele nome do carro
Deve ser possivel listar todos os carros disponiveis pele nome do categoria
Deve ser possivel listar todos os carros disponiveis pelo nome da marca

**RN**
O usuario não precisa estar logado no sistema

## Cadastro de especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro
Deve ser possivel listar todos as especificações
Deve ser possivel listar todos os carros

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro
O usuario responsavel pelo cadastro deve ser um usuario administrador

## Cadastro de imagens de carro

**RF**
Deve ser possivel cadastrar a imagem do carro
Deve ser possivel listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
O usuario responsavel pelo cadastro deve ser um usuario administrador

## Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
O aluguel deve ter duração minima de 24 horas
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro
