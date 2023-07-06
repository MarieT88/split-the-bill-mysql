/*const app = require('./app');
const { syncAndSeed } = require('./db');

const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();*/

const app = require('./app');
const { syncAndSeed } = require('./db');

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });

    server.on('error', (error) => {
      console.error('Error starting the server:', error);
    });
  } catch (ex) {
    console.error('An error occurred during initialization:', ex);
  }
};

init();



