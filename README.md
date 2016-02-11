# MagicalPixi
A website tool  for creating html5 game with pixi.js 

启动

npm start

计划

  - 游戏工程结构和模版
  - 素材库 - 多个工程恭共享
  - MovieClip预览,并收入‘素材库’
  - Sprite预览，并收入‘素材库’
  - Stage新建-切换

问题：

- 项目的结构
- 关于精灵的Actions
- 关于精灵的运动
- 一个精灵多个动作的管理
- 一个精灵多种样式纹理的管理


##Has been add GitTool(Maybe deprecated)

###Thanks for [nodegit](http://www.nodegit.org/)
####Done

- Make `add .` and `commit -m"add picture"` command to `'../ImageRepository'`

####Todo

- Push Repository to remote maybe [github](git@github.com:MagicalPixi/ImageRepository.git)
- Pull Repository before make push command
- Make a real tool module for easy using
- so on 

####Notice

- For the Error `Cannot find module '../build/Debug/nodegit'`

it's Maybe a error for missing `openssl`

So try `brew install openssl` && `brew link openssl --force`
