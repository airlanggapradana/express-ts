
# RESTFULL-API EXPRESS TS

A project that teaches me how to establish a REST-API using Express with Typescript


## API Reference

#### Get All users

```http
  GET /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get User by ID

```http
  GET /users/${user_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. Id of user to fetch |

#### Post New User

```http
  POST /users
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** |
| `name`      | `string` | **Required** |
| `password`      | `string` | **Required** |

#### Update User

```http
  PUT /users/${user_id}
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Optional** |
| `name`      | `string` | **Optional** |
| `password`      | `string` | **Optional** |

#### Delete User

```http
  DELETE /users/${user_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required** |


## Tech Stack

**Server** : Express, Node js, Typescript, Prisma, Nodemon

**Database** : PostgreSQL

