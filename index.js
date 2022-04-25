/**
 *
 * index.js
 * @author wangbo
 * @since 2022/4/25
 */
const express = require('express')
const request = require('request');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
});

let send = {
    'Error:':'查询失败',
    'code':400,
}
app.get('/api/getUrl', async (req, res) => {
    let { url } = req.query;
    url = httpString(url);

    //前端传过来的地址 进行重定向拿到 item_ids 并且返回
    let watermark = await new Promise(resolve=>{
        request(url,(error, response, body) => {
            if (!error && response.statusCode === 200) {
                let href = response.request.href;
                let id = void 0;

                try {
                    id = href.match(/video\/(\S*)\?/)[1];
                } catch (error) {
                    res.json(send)
                    return false;
                }

                resolve(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${id}`);
            }else{
                res.json(send)
            }
        })
    });

    //拿到完整地址返回指定数据
    request(watermark,async (error, response, body)=>{
        if (!error && response.statusCode === 200) {
            let result = JSON.parse(body);
            let data = result.item_list[0];
            //视频url解析
            let video = await videourl(data['video']["play_addr"]["url_list"][0]);
            // 拼接返回指定数据
            res.json({
                'title':data["share_info"]["share_title"],
                'cover':data['video']["origin_cover"]["url_list"][0],
                'video':video,
                'audio':data['music']["play_url"]["uri"],
                'code':200,
            })
        }else{
            res.json(send)
        }
    })
});

//解析视频
const videourl = async (url)=>{
    //截取字符串 wm
    url = url.replace(/wm/g,'');
    return await new Promise(resolve=>{
        request(url,(error, response, body) => {
            resolve(response.request.href)
        })
    })
}

//解析字符串里面的url
const httpString = (s) =>{
    let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    try {
        return s.match(reg)[0];
    } catch (error) {
        return null;
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})