# API Ticketing

This API allows you to manage a Ticket System. The available endpoints are described below.

## Endpoints Users

### User Signup

#### POST `api/users/signup`

**Description:** Returns a created user.

**Successful Response**
- **Code:** 201 OK.
- **Body:** Objet user + JWT

- Example Data:
    ```json
    {
    "email": "miguel@email.com",
    "password": "12345678",
    "name": "Miguel"
    }
    ```

- Example answer:
    ```json
    {
    "email": "miguel@email.com",
    "password": "12345678",
    "name": "Miguel"
    }
    ```
**Response if user already registered**
- **Code:** 400 .
- **Body:** "User already registered"

### User Login

#### POST `api/users/login`

**Description:** Returns a created user.

**Successful Response**
- **Code:** 200 OK.
- **Body:** Object user + JWT

- Example Data:
    ```json
    {
    "email": "miguel@email.com",
    "password": "12345678",
    }
    ```
**Response if incorrect email or password**
- **Code:** 400 .
- **Body:** "Invalid email or password."


## Endpoints tickets

### Get all tickets

#### GET `/api/tickets/`

**Description:** Return all tickets

**Successful Response**
- **Code:** 200 OK.
- **Body:** list of object ticket

- Example Response:
    ```json
    [
        {
            "id": 1,
            "user": "miguel",
            "createdAt": "01/01/2024",
            "status": "open",
            "priority": "low",
            "title": "Example",
            "description": "This is an example ticket",
        }
    ]
    ```
**Response if incorrect email or password**
- **Code:** 400 .
- **Body:** "Invalid email or password."

### Ticket Create

#### POST `/api/tickets/`

**Description:** Logged users can create a ticket.

**Successful Response**
- **Code:** 201 OK.
- **Body:** Object ticket

- Example Data:
    ```json
    {
        "user": "miguel",
        "status": "open",
        "priority": "low",
        "title": "Example",
        "description": "This is an example ticket",
    }
    ```

- Example Response:
    ```json
    {
        "id": 1,
        "user": "miguel",
        "createdAt": "01/01/2024",
        "status": "open",
        "priority": "low",
        "title": "Example",
        "description": "This is an example ticket",
    }
    ```
**Response if something wrong**
- **Code:** 400 .
- **Body:** Error description

### Get a Ticket

#### GET `/api/tickets/:id`

**Description:** Return one ticket

**Parameters:**

- **Path Variable:** `id` (Long) - Ticket ID

**Successful Response**
- **Code:** 200 OK.
- **Body:** object ticket

- Example Response:
    ```json
    [
        {
            "id": 1,
            "user": "miguel",
            "createdAt": "01/01/2024",
            "status": "open",
            "priority": "low",
            "title": "Example",
            "description": "This is an example ticket",
        }
    ]
    ```
**Response if ticket does not exist**
- **Code:** 404 .
- **Body:** "Ticket not found"


### Update a Ticket

#### PUT `/api/tickets/:id`

**Description:** Update one ticket

**Parameters:**

- **Path Variable:** `id` (Long) - Ticket ID

**Successful Response**
- **Code:** 200 OK.
- **Body:** object ticket

- Example Data:
    ```json
    {
        "user": "miguel",
        "status": "open",
        "priority": "low",
        "title": "Example",
        "description": "This is an example ticket",
    }
    ```

- Example Response:
    ```json
    [
        {
            "id": 1,
            "user": "miguel",
            "createdAt": "01/01/2024",
            "status": "open",
            "priority": "low",
            "title": "Example",
            "description": "This is an example ticket",
        }
    ]
    ```
**Response if ticket does not exist**
- **Code:** 404 .
- **Body:** "Ticket not found"

### Delete a Ticket

#### DELETE `/api/tickets/:id`

**Description:** Delete one ticket

**Parameters:**

- **Path Variable:** `id` (Long) - Ticket ID

**Successful Response**
- **Code:** 200 OK.
- **Body:** object ticket

- Example Response:
    ```json
    [
        {
            "id": 1,
            "user": "miguel",
            "createdAt": "01/01/2024",
            "status": "open",
            "priority": "low",
            "title": "Example",
            "description": "This is an example ticket",
        }
    ]
    ```
**Response if ticket does not exist**
- **Code:** 404 .
- **Body:** "Ticket not found"
