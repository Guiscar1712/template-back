
Table users {
  user_id UUID [primary key]
  name VARCHAR
  password VARCHAR
  created_at TIMESTAMP [default: "CURRENT_TIMESTAMP"]
  status VARCHAR [default: "active"]
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

