# <center>**Super Spreader**</center>

Super Spreader is a multiplayer web-based ‘IO game’ that can be played without downloading. The game has a theme of Covid-19 and is used to show how easily the virus can spread.

## ***Create/Join Game***
The Game offers the functionality to create or join an existing lobby so you can play with your friends. 

Main menu:

<img src="https://imgur.com/UTsBkaP.png" width="300">

### ***Creating a lobby***
To create a new lobby simply pick a name for your character and click the 'Create New Game' button on the main menu. This will take you to the lobby screen where you can see the lobby code and the players already in the lobby. Share this code with people you want to play with.  

<img src="https://imgur.com/zD0rghA.png" width="300">

### ***Joining a lobby***
From the main menu, Type in your user name and also the lobby code of the lobby you wish to join and click the 'Join button'. This will take you to the lobby screen and put you in the lobby ready to play.

### ***Starting the game***
If anyone in the lobby clicks the 'Play' button the game will start

## ***Game Play***
The game begins with a single player being 'infected' and the goal of the infected player is to 'infect' the other players by touching them and the goal of other players is to survive (avoid being infected) until the timer runs out.

<img src="https://imgur.com/pAJ7aK0.png" width="400">

### ***Controls***
The game makes use of the basic WASD keys for movement.
- W: move up
- A: move left
- S: move down
- D: move right

players can also hold down two keys at the same time to move in diagonal directions e.g. holding down W and A will move the player to the top left side of the screen(North-West).


### ***Map***
The map features many different types of obstacles such as:
- Walls: Obstacle that players cannot pass through
- Ice: While a player is on ice they can move very fast in a single direction by 'slipping'
- Mud: While in mud, the players movements are restricted and they are slowed down significantly; 

# **Running the project**

## ***Running on local host(best performance)***
To run the project you must first clone the repository to your computer. To do this do:

1. In your command prompt, execute `git clone https://github.com/csdoris/Group-35-Sienna-Sheep.git`. This should download the repository.

2. Make sure your file path is set to the top level of the repository(../Group-35-Sienna-Sheep) and then run `npm install` and wait for that to complete.

3. After that is done run the command `npm run develop`. This should start the server and the game should compile.

4. Go to `http://localhost:3000/` in your browser or click [here](http://localhost:3000/) to play the game.

### ***Connecting multiple devices to locally running game***

If you wish to play on multiple computers while the game is running locally.

1. Connect all devices to the same network.
2. Identify the IP address of the host device.
3. Make sure any software firewalls on the non-host computers are configured to accept connections from remote computers on port 3000.
4. Replace 'localhost' from the URL with the hosts IP address 
  - eg. `http://192.345.123.1:3000/` if '192.345.123.1' is the host IP. 
5. Go to this URL in your browser. 

Note: This may not work in all cases. 

## ***Using deployed heroku website***

Go to [`https://superspreader.herokuapp.com/`](https://superspreader.herokuapp.com/) to play the game. Since the server for this is set in American, there is alot of noticeable lag when playing which is not the best experience.

## ***Running Tests***
Before running tests make sure you have run `npm install` in the top level directory. If you haven't done this, then follow the first two steps of ***Running on local host*** above. After that is done, simply run `npm run test` in the terminal and all tests should run.
