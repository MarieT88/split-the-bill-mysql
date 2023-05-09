const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, VIRTUAL } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

//User model

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
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
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  avatar: {
    type: TEXT,
    get: function(){
      const prefix = 'data:image/png;base64,';
      const data = this.getDataValue('avatar');
      if(!data){
        return data;
      }
      if(data.startsWith(prefix)){
        return data;
      }
      return `${prefix}${data}`;
    }
  },
  name: {
    type: VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});



User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});

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

/*
User.associate = function(models) {
  User.belongsToMany(models.Event, { through: 'UserEvent' });
  User.belongsToMany(models.Bill, { through: 'UserBill' });
};
// bill methods

User.prototype.getBills = async function() {
  return this.getBill();
};

User.prototype.addBill = async function(bill) {
  if (!this.bills.includes(bill)) {
    await this.addBill(bill);
  }
};

// event methods

User.prototype.getEvents = async function() {
  return this.getEvent();
};

User.prototype.addEvent = async function(event) {
  return this.addEvent(event);
};

*/

User.prototype.createBill = async function (_bill) {
  let bill = await conn.bill.create({
    name: _bill.name,
    amount: _bill.amount,
    dueDate: _bill.dueDate,
    note: _bill.note,
    userId: this.id,
  });
  return bill;
};


module.exports = User;

