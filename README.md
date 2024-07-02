# Autos el león

## Descripción 
Este proyecto es un ecommerce realizado con Node JS, que permite hacer la realización de compras de autos , registrarse en la pagina , logearse , tener tu propio carrito, etc ...

## Instalación
- Node JS
- $ npm install  

### Correr la app
# development
$ npm run start:dev


.
├── src
│   ├── auth                # authentication, authorization and user module
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── constants       # constants
│   │   │   └── constants.ts
│   │   ├── decorators      # custom decorators
│   │   ├── dto
│   │   ├── guard           # guards
│   │   ├── helpers
│   │   ├── interfaces
│   │   ├── repository
│   │   ├── shema
│   │   ├── strategies
│   │   ├── types
│   │   └── user
│   │       ├── repository
│   │       ├── user.controller.spec.ts
│   │       ├── user.controller.ts
│   │       ├── user.service.spec.ts
│   │       └── user.service.ts
│   ├── common            # common module
│   │   ├── common.module.ts
│   │   ├── dto
│   │   ├── middleware    # common middlewares
│   │   ├── pipes         # custom pipes
│   ├── config            # global config
│   ├── main.ts
│   └── monster
│       ├── dto
│       ├── monster.controller.spec.ts
│       ├── monster.controller.ts
│       ├── monster.module.ts
│       ├── monster.service.spec.ts
│       ├── monster.service.ts
│       ├── repository
│       ├── schema
│       └── types
├── test
└── tsconfig.json..