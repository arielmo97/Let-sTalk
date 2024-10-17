# AP2 - Ex2: Let'sTalk
## By Ariel Moshayev, Shaked Maman and Lior Bazak.
This project is a chat application that allows users to create accounts and chat with other users.

our chat application, called Let'sTalk is a web-based messanger app that was built using:
- React for the front (including HTML, CSS, Bootstrap, JQuery and JavaScript)
- Express for the backend
- MongoDB for the database
- WebSockets for real time rendering between two users which are connected online to the application.

There are three main screens in our chat application:
1. Login Screen
2. Register Screen
3. Chat Screen

### Login Screen
<br>
The login page is the first page that users will see when they run our project, and only registered users can connect to the app.

It has two input fields - username and password
<br>
1. Username - a unique property of each user that was chosen during registration.
2. Password - The user needs to enter a password that matches the password that was chosen during registration.
<br>
In order to let the user know which input he needs to enter, we create an hover icon that informs to the user what he needs to enter in each field.

If the user enters valid username and password, he will be logged in and redirected to the chat page.
However, if at least one of the input fields are invalid, an error message will be shown (according to the invalid field).

The main page is Login, but the user can press the link that navigates him to the Register screen in order to create an account first.

### Register Screen
<br>
The registration screen contains a form that users can use to create a new account. The form has five fields:
1. Username - each user has a unique username in Let'sTalk
2. Display name - the name that will be shown to the user's contacts, and has to be less than 20 characters long.
3. Password - the password must contain at least one letter and one digit and be at least five characters long.
4. Verify Password
5. Picture - the user needs to select a profile picture that is in JPEG/PNG only.

Similar to login page, we created an hover icon that informs the user what he needs to enter in each field.

If the user enters valid inputs his account will be created (his data will be saved in MongoDB).
But if the user enters any invalid information, an error message will be shown.

### Chat Screen
<br>
The chat screen is the page that users will see after they are logged in.
It has a list of all of the chats with other users, as well as a chat input field so that the logged in user will be able to text other users.
To send a message to another user, the user can type his message in the chat input field and press Enter or click the send button, and the message will be shown on the chat conversation of both users.

To add a contact, the user needs to click on the "Add Contact" icon and enter the username of the contact that he wants to add.
The users will be added to each other's contacts list.
And from now - the users can have a chat.

To logout, the user needs to click on the "Log out" button on the right side of the screen.
The user will be logged out of the chat application and redirected to the login screen.

## Running The App
<br>

1. Clone the repository from our git to your computer by running the command:
   ``` git clone https://github.com/liorbazak1710/AP2-Ass2.git ```

2. Enter to the repository directory and open terminal from it.

3. cd Let'sTalk folder and install the client-socket.IO dependencies by entering this command in the terminal:  <br><br>
   ```c++
   npm install client-socket.io
   ```

4. cd to 'Server' folder and install the dependencies of React by entering this command in the terminal:  <br><br>
   ```c++
   npm install
   ```
5. Stay on 'Server' folder and install the dependencies of Cors,Socket.IO ,Express and Nodemon by entering this command in the     terminal:  <br><br>
   ```c++
   npm install express cors nodemon socket.io
   ```
6. In order to run the server, you need to stay on the 'Server' folder and to enter the following command (first, make sure you have MongoDB installed on your computer): <br><br>
   ```c++
   npm run serve
   ```
7. open your browser on http://localhost:5000/ and you'll see the app.
    <br>

## Important Note!
If you want to run the server and the client seperately (which means the React-app will run on http://localhost:3000/),
when you first enter to Let'sTalk folder, run the following command in the terminal: <br><br>
```c++
npm install
```
Now do the rest of the instructions, and when you run the server you can do 'cd ..' to return to Let'sTalk folder and then run the React app by entering the command: <br><br>
   ```c++
   npm start
   ```
In that case the server is running and the app will be running on http://localhost:3000/.

Enjoy using our Let'sTalk application!


