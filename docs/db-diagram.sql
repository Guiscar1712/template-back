
Table users {
  user_id UUID [primary key]
  name VARCHAR
  password VARCHAR
  created_at TIMESTAMP [default: "CURRENT_TIMESTAMP"]
  status VARCHAR [default: "active"]
}

Table roles {
  role_id UUID [primary key]
  role_name VARCHAR
  description VARCHAR
}

Table users_roles {
  user_id UUID
  role_id UUID
}

Table emails {
  email_id UUID [primary key]
  email VARCHAR [unique]
  created_at TIMESTAMP [default: "CURRENT_TIMESTAMP"]
}

Table phones {
  phone_id UUID [primary key]
  phone VARCHAR
  created_at TIMESTAMP [default: "CURRENT_TIMESTAMP"]
}

Table addresses {
  address_id UUID [primary key]
  street VARCHAR
  city VARCHAR
  state VARCHAR
  country VARCHAR
  postal_code VARCHAR
  created_at TIMESTAMP [default: "CURRENT_TIMESTAMP"]
}

Ref: users_roles.user_id > users.user_id
Ref: users_roles.role_id > roles.role_id
