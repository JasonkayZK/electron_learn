## Electron learn

一个学习Electron的仓库。

### Electron环境部署

**Electron要求主机已经部署Node环境，所以在部署Electron之前，请确保你的主机已经成功安装了Node!**

使用npm或者cnpm全局安装electron：

```bash
npm install -g electron
或
cnpm install -g electron
```

检查：

```bash
electron -v
v10.1.3
```

### 创建一个简单的Electron项目

#### **① 创建项目**

Electron application 本质上是一个 Node. js 应用程序，与 Node.js 模块相同，应用的入口是 `package.json` 文件；

一个最基本的 Electron 应用一般来说会有如下的目录结构：

```
your-app/
├── package.json
├── main.js
└── index.html
```

所以我们可以使用`npm init`初始化一个项目，并编辑package.json内容如下：

package.json

```json
{
  "name": "electron_learn",
  "version": "1.0.0",
  "description": "a repo to learn electron",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "author": "JaonkayZK",
  "license": "MIT",
  "dependencies": {
    "app": "^0.1.0",
    "browser-window": "^0.4.0"
  },
  "devDependencies": {
    "electron": "^10.1.3"
  }
}
```

>   <font color="#f00">**其中的 `main` 字段所表示的脚本为应用的启动脚本，它将会在主进程中执行。**</font>
>
>   <font color="#f00">**注意：如果 `main` 字段没有在 `package.json` 中出现，那么 Electron 将会尝试加载 `index.js` 文件（就像 Node.js 自身那样）。**</font>

因为在默认情况下，使用`npm start`会通过Node.js执行main.js(或者index.js)，所以我们在scripts中自定义了start命令，使得可以通过`npm start`启动我们的Electron应用；

#### **② 编写main.js**

Electron apps 使用JavaScript开发，其工作原理和方法与Node.js 开发相同；

在`electron`模块包含了Electron提供的所有API和功能，引入方法和普通Node.js模块一样：

```javascript
const electron = require('electron')
```

而`electron` 模块所提供的功能都是通过命名空间暴露出来的；比如说： `electron.app`负责管理Electron 应用程序的生命周期， `electron.BrowserWindow`类负责创建窗口；

下面是一个简单的`main.js`文件，它将在应用程序准备就绪后打开一个窗口；

```javascript
// 控制应用生命周期的模块
const app = electron.app;
// 创建原生浏览器窗口的模块
const BrowserWindow = electron.BrowserWindow;

function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

我们应当在 `main.js` 中创建窗口，并处理程序中可能遇到的所有系统事件；

下面我们将完善上述例子，添加以下功能：打开开发者工具、处理窗口关闭事件、在macOS用户点击dock上图标时重建窗口，添加后，main. js 就像下面这样：

```javascript
const electron = require('electron');
// 控制应用生命周期的模块
const app = electron.app;
// 创建原生浏览器窗口的模块
const BrowserWindow = electron.BrowserWindow;

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // 打开开发工具
    mainWindow.openDevTools();

    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });
});

```

#### **③ 编写页面**

最后，我们创建想要展示的页面：

index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World!</title>
</head>
<body>
<h1>Hello World!</h1>
We are using io.js
<script>document.write(process.version)</script>
and Electron
<script>document.write(process.versions['electron'])</script>
.
</body>
</html>
```

#### **④ 启动你的应用**

在创建并初始化完成 `main.js`、 `index.html`和`package.json`之后，就可以在当前工程的根目录执行 `npm start` 命令来启动刚刚编写好的Electron程序了。

如果一切正常的话，就会输出一个Hello World的应用！

### 尝试此例

复制并运行这个库[JasonkayZK/electron_learn](https://github.com/JasonkayZK/electron_learn/tree/main)

**注意**：本例需要 [Git](https://git-scm.com/) 和 [npm](https://www.npmjs.com/) 来运行；

```sh
# 克隆这仓库
$ git clone git@github.com:JasonkayZK/electron_learn.git
# 进入仓库
$ cd electron_learn
# 安装依赖库
$ npm install
# 运行应用
$ npm start
```

