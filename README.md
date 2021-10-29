# JSRamver project frontend
This project features a website for viewing and traiding stocks. The user must authenticate before trading but can still view the current price and up to 30 days of price history and changes. The prices of the stocks are update each second while the history is updated each minute, hour and day.

## Setup

In the project directory, you can run:

### `npm install`
Installs all dependencies


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Technologies

### React
I choose to use react as the framwork for this project. I believe react is a good alternative when developing frontends and features a lot of functionality for creating a good codebase that is easy to develop, deploy and maintain. If combined with reactr-router, it is very easey to create a well perfoming app fast. The system is also quite well documented, see [the official docs.](https://reactjs.org/docs/getting-started.html)

### Material UI
I choose to use Material UI v5.0.0 which allowed me access to a lot of prestyled components for react. This allowed me to get a good looking website without the need for a lot of custom styling. No need to reinvent the wheel.
### Recharts
I chooose to render the chart of the history of the stock using [recharts](https://recharts.org/en-US/). It featured a responsive chart component for react which allowed me to show it for different screen sizes. It was a good fit for this project but the documentation has very few examples. 
### Socket.io
I choose to use socket.io instead of normal websockets as it features some predefined functionality for listening to custom messages and general error handling.
