# Terminal Clone
A Directory management system clone that allows creation and deletion of files and folders. Exposes a remoteEntry that is being consumed by [clones.strek.in](https://clones.strek.in).

## Development
To start developing follow these steps
- Clone the repo
- cd into the repo
- run `yarn install` or `yarn`
- run `yarn start` to start the development server
- open `localhost:1236` in browser

Running `yarn start` exposes a remoteEntry file as well which can be consumed in other apps via moduleFederation

### outcome
Implemented a GUI based tree that allows creation, deletion and traversal of nodes. Also exposed a remoteEntry to allow [clones.strek.in](https://clones.strek.in) to use it as micro frontend.


Demo: https://terminal.strek.in/

Used inside: https://clones.strek.in
