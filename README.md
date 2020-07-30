
### Descrição

  + A API desenvolvida tem por objetivo principal, armazenar as ferramentas mais utilizadas por usuários, sendo possível pesquisá-las por usuário que as cadastrou e/ou tags de referência.

  + Possui também cadastro e autenticação de usuários, sendo obrigatório para cadastrar e gerenciar novas ferramentas na plataforma.


####  API em Node.js para teste na plataforma BossaBox.

   + Tecnologias utilizadas:
        - Node.js, HapiJs, JWT, Bancos de Dados MongoDB e Redis.
      
   + Padronização de código:
        - Eslint. 
      
   + Ferramentas/Frameworks:
        - Docker, Moongose, Jest, API Blueprint
    
   + Segurança: 
        - bcryptjs: Gerador de hashs de senhas padrão.
        

 ### Configurações para execução local:
 

  - Renomeie o arquivo `.env.example` para `.env`, gere uma SECRET_KEY e adicione o valor a variável `SECRET_KEY` no arquivo.
Para rodar local, você pode por qualquer valor no SECRET_KEY ou gerar uma de forma mais segura com o comando:
```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
 
 ###  Instalação:
  
   ##### 1.Instalar todas as dependências:
        npm i
   ##### 2. Criando e executando Docker Container:
        docker-compose up -d
   ##### 3. Executar testes da aplicação:
        npm run test
   ##### 4. Renderizando e visualizando documentação da API, porta padrão 3000:
        npm run doc
        npm run doc --server
