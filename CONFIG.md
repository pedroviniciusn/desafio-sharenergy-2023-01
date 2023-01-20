## Configurações iniciais

## Docker

Você precisa também do  **Docker**  instalado e rodando em sua máquina. Caso ainda não tenha realizado esta instalação, aqui está um artigo que mostro como fazer:  [https://balta.io/blog/docker-instalacao-configuracao-e-primeiros-passos](https://balta.io/blog/docker-instalacao-configuracao-e-primeiros-passos)

## Obtendo a imagem

Certifique-se que o Docker está em execução e abra um novo terminal, no meu caso, a versão do Docker em execução é a mostrada abaixo. Você pode verificar isto executando o comando  `docker --version`  no seu terminal.

    Docker version 19.03.12, build 48a66213fe

Nosso primeiro passo então é obter a imagem do Mongo que será o molde para criarmos nossos contêineres. Para isto, executamos o comando abaixo.

    docker pull mongo

Note que a primeira mensagem será `Using default tag: latest` o que significa que estamos obtendo a última versão desta imagem, provavelmente com a última versão estável do Mongo.

## Rodando o Mongo

Para executar esta imagem você pode usar a linha abaixo. Não se esqueça de mudar o  `MONGO_INITDB_ROOT_USERNAME`  e  `MONGO_INITDB_ROOT_PASSWORD`  para o usuário e senha desejado.

    docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root-e MONGO_INITDB_ROOT_PASSWORD=test1010 mongo

### Windows

Caso esteja no Windows, com  **WSL 2**  é importante informar o volume onde este container será executado, utilizando a flag  `-v ~/docker`  como mostrado abaixo.

    docker run -v ~/docker --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=balta -e MONGO_INITDB_ROOT_PASSWORD=e296cd9f mongo

Para parar a execução você pode pressionar CTRL + C no Terminal. Deste momento em diante, seu container vai aparecer na **Dashboard** do Docker de forma visual, onde você poderá parar ou iniciar ela a qualquer momento.

## Connection String

Se você utilizou as mesmas configurações deste artigo, sua  **Connection String**  será igual abaixo. Caso necessário, modifique as informações que alterou na execução dos containers.

    mongodb://root:test1010@localhost:27017/admin

### GUI Client

Caso queira gerenciar seu banco de uma forma visual, você pode utilizar uma das ferramentas gratuitas abaixo:

-   [MongoDb Compass](https://www.mongodb.com/try/download/compass)

Caso não consiga se conectar no MongoDb Compass e estiver dando o erro **Authentication failed.**, rode o seguinte comando no seu terminal: 

    hostname -I | cut -f 1 -d ' '
    
Em seguida ele vai retornar o seu endereço de IP, substitua o localhost por ele e tente se conectar novamente no MongoDb Compass:

    mongodb://root:test1010@172.22.91.45:27017/admin

## Front end
Navegue até a pasta chamada client no projeto e execute **npm install** ou se você tiver o yarn instalado globalmente na sua maquina execute o **yarn**.

Agora com todas as dependências instaladas, o front está pronto para rodar na sua máquina, para executar rode o seguinte comando no seu terminal dentro da pasta client: 

    yarn start

## Backend
Navegue até a pasta chamada api no projeto e execute **npm install** ou se você tiver o yarn instalado globalmente na sua maquina execute o **yarn**.

Agora com todas as dependências instaladas, o back está pronto para rodar na sua máquina, para executar rode o seguinte comando no seu terminal dentro da pasta api: 

    yarn run dev

