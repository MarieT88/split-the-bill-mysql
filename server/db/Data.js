

const users = [
	{
	  username: 'Marie',
	  password: '123',
	  firstName: 'Marie',
	  lastName: 'Tornetto',
	  email: 'MT@gmail.com',
	  bills: [
	    {
		  name: 'Rental',
		  amount: 500.00,
		  dueDate: '2023-07-02',
		  note: 'Going up to 550 next month',
		},
		{
	  	name: 'Car',
		  amount: 250.00,
		  dueDate: '2023-07-22',
	    },
		{
		  name: 'Phone',
		  amount: 54.62,
		  dueDate: '2023-07-13',
		},
	  ]
	},
	{
    username: 'Vicke',
	  password: '123',
	  firstName: 'Victoria',
	  lastName: 'Tornetto',
	  email: 'VT@gmail.com',
	},
	{
	  username: 'Des',
	  password: '123',
	  firstName: 'Desiree',
	  lastName: 'Tornetto',
	  email: 'DT@gmail.com',
	},
	{ 
      username: 'Lucy', 
      password: '123', 
      firstName: 'Lucille', 
      lastName: 'Ball', 
      email: 'LB@gmail.com', 
	},
	{ 
      username: 'Moe', 
      password: '123', 
      firstName: 'Moe', 
      lastName: 'Shom', 
      email: 'MS@gmail.com',
	}
];


const bills = [
   {  
	    name: 'Rent',
	    amount: 500.00,
	    dueDate: '2023-07-02',
	    note: 'Going up to 550 next month',
    },
    {
	    name: 'Electric',
	    amount: 250.00,
	    dueDate: '2023-07-22',
    },
    {
	    name: 'Water',
 	    amount: 54.62,
	    dueDate: '2023-07-13',
    },
    {
		  name: 'Boat',
		  amount: 500.00,
		  dueDate: '2023-07-02',
		  note: 'Going up to 550 next month',
		},
		{
	  	name: 'Car',
		  amount: 250.00,
		  dueDate: '2023-07-22',
	    },
		{
		  name: 'Phone',
		  amount: 54.62,
		  dueDate: '2023-07-13',
		},
    {
      name: 'Girls Vegas Weekend',
      amount: 3500.00,
      dueDate: '2023-09-02',
      note: 'Not including flights',
    }
  ];
  
  module.exports = {
    users,
    bills, 
}; 




/*const events = [
    {
      name: 'Trip to Spain',
	  date: '2025-03-05',
	  note: 'Can\'t wait!',
	},
	{
      name: 'Joe\'s Bachelor Weekend',
	  date: '2023-09-05',
	  note: '7 people confirmed',
	},
	{
      name: 'Mom\'s Birthday Present',
	  date: '2024-04-06',
	  note: 'Spa Weekend',
	},
];*/



    