# Support ticket

Support ticket is project that is used to manage support tickets from clients, ranging from 
live chat, ticket status, and much more! 

The project was built using Typescript, ReactJS, Express, PostgreSQL, and tRPC.

This is a monorepo using pnpm workspaces, it includes the following packages:
 - Frontend -> React 
 - Backend -> Express
 - common -> some shared functionalities + types

## Building and compiling

This project requires Node `16+` and pnpm `8+`

clone this repository then:
1. run 
```pnpm install```, this will compile common project and starts the backend (port 3000) and frontend (port 5137)
2. then ```pnpm start```


**Note:** to add packages to a specific project (e.g. Frontend or backend) run ```pnpm frontend add <package_name>```

