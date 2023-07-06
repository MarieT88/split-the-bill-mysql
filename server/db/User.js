const conn = require('./conn');
//const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, VIRTUAL } = conn.Sequelize;
const { Sequelize, DataTypes } = require('sequelize');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, VIRTUAL } = DataTypes;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'secret';

//User model
const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUID
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Email address required.'
      },
      isEmail: {
        msg: 'Must be a valid email address.'
      }
    }
  },
  name: {
    type: VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
},
{ tableName: 'users' }
);


// hooks 
User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});

// login, token & authentication methods
User.findByToken = async function(token){
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if(user){
      return user;
    }
    throw 'user not found';
  }
  catch(ex){
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function(){
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function({ username, password }){
  const user = await this.findOne({
    where: {
      username
    }
  });
  if(user && await bcrypt.compare(password, user.password)){
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
};


module.exports = { User };




/* Example error handling
try {
  // Code that may result in a UniqueConstraintError
} catch (err) {
  if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'UniqueConstraintError') {
    // Handle the UniqueConstraintError here
    console.error('Duplicate entry found. Please provide a unique value.');
  } else {
    // Handle other types of errors
    console.error('An error occurred:', err);
  }
}*/