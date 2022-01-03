const express = require('express');
const app = express();

app.get('/config', function(req, res) {
  const schema = {
    _id: { type: 'String' },
    name: { type: 'String', label: 'Name' }
  };

  res.json({ schema });
});

app.listen(9000, () => {
  console.log('Card plugin api is now running on 9000');
});
