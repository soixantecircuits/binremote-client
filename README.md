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
Your server is now running.

To add an application, go in your application folder and add a `remote.json` file in it. Then, simply put the name of your application, the path to your thumbnail and the shell command to execute and kill it in the following format:

```json
{
	"name": "Super App",
	"img": "/path/to/the/thumbnail",
	"run": "cd /path/to/your/app && make run",
	"kill": "kill $(ps aux | grep 'superApp' | awk '{print $2}')"
}
```

If you don't want to change the crawler root directory, you'll need to manage your apps like this:
```
/
home/
	|  user/
			|  sources/
						|   of/
						|   python/
						|   processing/
								and_so_on ...
```

Refresh the page, and that's it !

### Troubleshooting

#### Linux:
If you get an error like `nw: error while loading shared libraries: libudev.so.0: cannot open shared object file: No such file or directory` you can simply type
```bash
$ sed -i 's/udev\.so\.0/udev.so.1/g' resources/node-webkit/Linux*/nw
```
You can [see here](https://github.com/rogerwang/node-webkit/wiki/The-solution-of-lacking-libudev.so.0) for explanations.