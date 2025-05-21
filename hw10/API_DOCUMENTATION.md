# CS571 S25 HW10 API Documentation

## At a Glance

All routes are relative to `https://cs571api.cs.wisc.edu/rest/s25/hw10/`

| Method | URL | Purpose | Return Codes |
| --- | --- | --- | --- |
| `GET`| `/chatrooms` | Get all chatrooms. | 200, 304 |
| `GET` | `/messages?chatroom=NAME&num=NUM`| Get latest `NUM` messages for specified chatroom. | 200, 400, 404 |

An unexpected server error `500` or "hung" response *may* occur during any of these requests. It is likely to do with your request. Make sure that you have included the appropriate headers and, if you are doing a POST, that you have a properly formatted and stringified JSON body. If the error persists, please contact a member of the course staff.

A valid `X-CS571-ID` must be included with each request, otherwise you will recieve a `401` in addition to any of the errors described below.

## In-Depth Explanations

### Getting all Chatrooms
`GET` `https://cs571api.cs.wisc.edu/rest/s25/hw10/chatrooms`

A `200` (new) or `304` (cached) response will be sent with the list of all chatrooms.

```json
[
    "Bascom Hill Hangout",
    "Memorial Union Meetups",
    "Witte Whispers",
    "Chadbourne Chats",
    "Red Gym Rendezvous",
    "Babcock Banter",
    "Humanities Hubbub"
]
```

### Getting Messages for Chatroom

`GET` `https://cs571api.cs.wisc.edu/rest/s25/hw10/messages?chatroom=CHATROOM_NAME&num=NUM`

Both `chatroom` and `num` are optional parameters. `chatroom` specifies the chatroom to retrieve messages from, while `num` specifies the number to retrieve. By default, if no `chatroom` is specified, the latest message(s) will be returned. By default, if no `num` is specified, 1 message will be returned. There is a limit of up to 100 messages.

**All messages are public**, you do *not* need to be logged in to access them. Messages made over 100 messages ago are no longer accessible via the API. A `200` (new) or `304` (cached) response will be sent with messages organized from most recent to least recent. Note that the `created` field is in a ISO 8601 format.

```json
{
    "msg": "Successfully got the latest messages!",
    "page": 1,
    "messages": [
        {
            "id": 2,
            "poster": "acct123",
            "title": "Where is everyone??",
            "content": "Is this assignment released yet?",
            "chatroom": "Bascom Hill Chatters",
            "created": "2023-10-14T21:06:15.000Z"
        },
        {
            "id": 1,
            "poster": "acct123",
            "title": "Hello! 👋",
            "content": "Welcome to BadgerChat! 🦡",
            "chatroom": "Bascom Hill Chatters",
            "created": "2023-10-14T20:48:53.000Z"
        }
    ]
}
```

If an invalid `num` is specified, a `400` will be returned.

```json
{
    "msg": "Only between 1 and 10 posts may be returned."
}
```

If a chatroom is specified that does not exist, a `404` will be returned.

```json
{
    "msg": "The specified chatroom does not exist. Chatroom names are case-sensitive."
}
```
