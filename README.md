# Bin Remote Client

Bin remote allows you to start application from any device within the same local network (WiFi or LAN).


## Requirements

Bin Remote Client uses nodejs, socket.io and the Express framework.

```bash
$ [sudo] npm install
```


## Usage

To launch Bin Remote Client, type the following commands in a terminal:

```bash
$ cd binremote-client/
$ npm start
```
Your bin remote client is now running.

To add an application, go in your application folder and add a `remote.json` file in it. Then, simply put the name of your application, the path to your thumbnail and the shell command to execute and kill it in the following format:

```json
{
	"name": "Super App",
	"img": "/path/to/the/thumbnail",
	"run": "/path/to/your/app/bin/./superApp",
	"kill": "kill $(ps -ef | grep superApp | awk '{print $2}')"
}
```

> HINT: Don't be shy and launch multiple processes with a `run.sh` and a `kill.sh` script :)

### Troubleshooting

#### Linux:
If you get an error like `nw: error while loading shared libraries: libudev.so.0: cannot open shared object file: No such file or directory` you can simply type
```bash
$ sed -i 's/udev\.so\.0/udev.so.1/g' resources/node-webkit/Linux*/nw
```
You can [see here](https://github.com/rogerwang/node-webkit/wiki/The-solution-of-lacking-libudev.so.0) for explanations.
