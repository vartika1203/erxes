const express = require('express');
const app = express();

app.get('/config', (req, res) => {
  const schema = {
    _id: { type: 'String' },
    name: { type: 'String', label: 'Name' },
    age: { type: 'Number', label: 'Age' },
    married: { type: 'Boolean', label: 'Is married' },
    birthDate: { type: 'Date', label: 'Birth date' }
  };

  const associatedTypes = ['deal'];

  const propertiesNegative = [
    {
      term: {
        status: 'deleted'
      }
    }
  ];

  const propertiesPositive = [];

  const selector = {
    bool: {
      must: [
        {
          terms: {}
        }
      ]
    }
  };

  res.json({
    schema,
    associatedTypes,
    propertiesNegative,
    propertiesPositive,
    selector
  });
});

app.listen(9000, () => {
  console.log('Card plugin api is now running on 9000');
});
