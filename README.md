# Speech Sound Sleuth (Backend)

Speech Sound Sleuth is a gamified adaptation of the classic "Where's Waldo?" concept, designed to support speech therapy. In this game, players are presented with various scenes that contain items associated with specific speech sounds. The game is timed, so players are encouraged to find the items as fast as possible. Once an item is found, the timer pauses, and the player is prompted to practice saying the item's name before continuing the game. After all items are found, the player can enter a nickname to submit to the leaderboard.

The backend is responsible for managing the game logic, handling requests from the frontend, and maintaining the leaderboard tables. The backend stores information about scenes, hidden items, and user scores.

Frontend Repo: [https://github.com/kristenmazza/speech-sound-sleuth-frontend](https://github.com/kristenmazza/speech-sound-sleuth-frontend)

See Speech Sound Sleuth live: https://speech-sound-sleuth.netlify.app/ :point_left:

## Technologies Used

- Express.js/Node.js
- MongoDB & Mongoose
- TypeScript
- Jest/Supertest/Mongodb-memory-server

## Getting Started

1. This project uses MongoDB for the database. See the relevant documentation for setup.
2. Run `npm install` to install the necessary dependencies.
3. Configure your database connection in the `.env` file by adding the following variable:
   - `MONGODB_URI=Your MongoDB connection string`
4. Use `npm run dev` to start the server in development mode.

## Deployment to Fly.io

The Express.js backend is deployed as a Fly VM to Fly.io. The definition for the deployment is in [fly.toml](./fly.toml) and it references the [Dockerfile](./Dockerfile).

The Fly.io command line interface is called `fly`. Install it with Homebrew package `flyctl`:

    brew install flyctl

To deploy change to Fly.io:

    fly deploy

Be sure to include your `MONGODB_URI` as a secret within your Fly.io settings.
