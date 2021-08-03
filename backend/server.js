import express from 'express';
import fs from 'fs';
import JSON5 from 'json5';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser);

function validate_user(username, password){
  const all_users = JSON5.parse(fs.readFileSync('backend/users.json5'));
  for(const user in all_users){
    if (user.username != username) continue;
    if (user.password != password){
      // TODO: Return a different value so we know this is wrong password
      return false;
    }
    else{
      return true;
    }
  }
  // TODO: Return a different value so we know user does not exist
  return false;
}

function is_authenticated(req){
  const cookie = req.cookies.loginCookie;
  if (cookie === undefined) 
    return false;
  const username = cookie['username'];
  const password = cookie['password'];
  return validate_user(username, password);
}


app.post('/login', (req, res) => {
  const cookieData = {'username': username, 'password': password};
  if (!validate_user(username, password)){
    // TODO: return the value in res
    return false;
  }
  const maxAge = remember_me ? 60*60*24*30 : 60*30;
  res.cookie('loginCookie',cookieData, { maxAge: maxAge, httpOnly: true });
  // TODO: return the value in res
  return true;
});

app.get('/api/products/:id', (req, res) => {
  if (!is_authenticated(req)){
    res.redirect('/login');
    return;
  }
  const data = JSON5.parse(fs.readFileSync('backend/data/products.json5'));
  const product = data.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.get('/api/products', (req, res) => {
  if (!is_authenticated(req)){
    res.redirect('/login');
    return;
  }
  const data = JSON5.parse(fs.readFileSync('backend/data/products.json5'));
  res.send(data);
});

app.post('/api/products', (req, res) => {
  if (!is_authenticated(req)){
    res.redirect('/login');
    return;
  }
  fd = fs.openSync('backend/data/products.json5', mode='w');
  try
  {
    const data = JSON5.parse(fs.readFileSync(fd));
    data.append({'id': 5});
    fs.writeFileSync(fd, data);
  }
  finally{
    fs.closeSync(fd);
  }
});

app.get('/', (req, res) => {
  res.send('Server is ready');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});