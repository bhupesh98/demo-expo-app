const db = require('./database');

export async function checkCredentials(email, password) {
  const response = db.users.find(
    user => user.email === email && user.password === password,
  );
  return response ?? null;
}

export async function registerUser(email, password, username) {
  const response = db.users.find(user => user.email === email);
  if (response) return false;
  db.users.push({ email, password, username });
  return true;
}
