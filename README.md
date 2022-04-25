## 抖音视频解析

### 使用方式：
- npm run start运行项目，打开http://localhost:3000/api/getUrl?url=https://v.douyin.com/1q2w3e4r
- url后面的参数为抖音的链接，可以在抖音直接点击复制链接，接口会自动解析url参数
- 返回参数
```json
{
  "title": "非要妹妹吗？姐姐不行吗",
  "cover": "https://p3-sign.douyinpic.com/tos-cn-p-0015/8c1de6af8c5e4c73b2b0290a5e9c1c3d_1650811125~tplv-dy-360p.jpeg?x-expires=1652061600&x-signature=%2F3Gfl3FTrqGfujDAXggNFf2VE60%3D&from=4257465056&se=false&biz_tag=feed_cover&l=202204251033280102040510710D35F1EE",
  "video": "https://aweme.snssdk.com/aweme/v1/play/?video_id=v0200fg10000c9im1d3c77ub8ai3900g&ratio=720p&line=0",
  "audio": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/7090179779231599374.mp3",
  "code": 200
} 
```
### 部署
- 支持自动在vercel上部署，只需要配置对应的token即可；
- 代码提交自动部署；
- 具体部署方式参考：https://juejin.cn/post/7023690214803505166#heading-5