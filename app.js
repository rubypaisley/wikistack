const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const models  = require('./models');
const { db } = require('./models');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

db.authenticate()
    .then(() => {
        console.log('connected to the database');
    })

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
    res.send(layout(''));
});

const PORT = 3000;

const init = async () => {
    await models.db.sync();

    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
      });
}

init();



