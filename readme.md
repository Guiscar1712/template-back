Arquitetura API

Controllers 
Users  -> Utilizar folders onde vai existir o arquivo controller e o arquivo de rota 
 

Domain
Entidades ->   Onde vamos definir a entidade, e vamos utilizar TypeORM. 
 

Interfaces
Aqui terá as interfaces que podem ser reeutilizadas e implementadas nas classes em todo o projeto, como, por ex: Repository.ts 
Onde é definido alguns métodos bases de um repository 

Providers 
Aqui ficam todas depedências externas do projeto, como, por ex: DatabaseProvider, onde é definido como é a conexão do banco, etc.. E o repositorie só reutiliza, sem saber como está sendo implementado, deixando o baixo acoplamento. 


Repositories
Será definido os repositories de cada entidade, implementando a interface repository e podendo adicionar métodos especificos, caso necessário.  E utilizando como injeção de depedência, o databaseProvider. 

Shared 
Aqui pode ter diversos folders que podem ser utilizados em todo o projeto, sendo eles funções de formatação, funções de data, etc.

Use Cases 
Aqui será dividido por folders de cada entidade, com cada caso de uso separado, para facilitar a manutenção. 

 
App.ts 
Onde é iniciado o projeto, BD, etc. 
Está configurado o ESlint, Prettier e editorConfig para mantermos o mesmo padrão de código.