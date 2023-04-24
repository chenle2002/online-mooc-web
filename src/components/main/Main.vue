<template>
  <div class="video-study">
    <el-container class="el-container">
      <el-header class="el-header">
        <div class="banner">
          <div class="back" @click="returnmain()">
            返回学堂
          </div>
          <div class="source-con">
            <p class="source-name">{{ name }}</p>
          </div>
          <div class="tuijian">
            <p style="margin: 0" @click="tuijian()">站长推荐 ❤</p>
          </div>
          <!--          <div class="header_userInfo">-->
          <!--            <div class="userLinks "  style=" ♂: 322px;height: 60px">-->
          <!--              <ul>-->
          <!--                <li><a href="//user.zhihuishu.com/zhsuser/account/new" target="_self" class="userLinks_item clearfix"><em-->
          <!--                    class="fl iconfont iconheiyemoshi-zhanghaoshezhi"></em><span class="fl">账号设置</span></a></li>-->
          <!--                <li><span target="_self" class="userLinks_item clearfix"><em-->
          <!--                    class="fl iconfont iconheiyemoshi-anquantuichu"></em><span class="fl">安全退出</span></span></li>-->
          <!--              </ul>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </el-header>

      <el-main class="el-main">
        <VideoPlayer :src="src" :key="key"></VideoPlayer>
      </el-main>
      <el-aside class="el-aside" >
        <div class="box-content" >
          <div class="box-right">
            <ul class="newListTest">
              <li class="show-course">
                <a target="_blank" @click="coursedes()">
                     <i class="el-icon-folder" @click="coursedes()"></i>

                <div @click="coursedes()">课程资料</div>
              </a>
              </li>
              <li class="show-course">
                <a target="_blank" @click="comment(0)">
                  <i class="el-icon-folder" @click="comment(0)" ></i>
                <div @click="comment(0)">课程评论区</div>
              </a>
              </li><!---->
            </ul>
            <div class="topicTitle clearfix">
              <ul>
                <li tid="1" class="tabTitle select">
                  <span style="width: 28px;height: 16px">目录</span>
                </li>
              </ul>
            </div>
            <div class="el-scrollbar" style="height: 494px">
              <div
                  class="el-scrollbar__wrap"
                  style="height: 100%;width: 100%;margin: 0">
                <div class="el-scrollbar__view">
                  <ul class="list" v-for="(item,i) in dataList">
                    <span class="position_first_bg"></span>
                    <li class="clearfix font_gray_inclined chapter" style="  padding-left: 3px;
                                                                             padding-top: 7px;
                                                                             padding-bottom: 7px;
                                                                             padding-right: 10px;
                                                                             height: 100%;width: 100%;margin: 0;
                                                                            ">
                      <span :title="i" class="catalogue_title3 fl"><b>第{{ i + 1 }}章</b>
                      </span>
                      <em class="chapter-em fl"></em>
                      <span class="time_ico_box fl"></span>
                      <span
                          :title="item.name"
                          class="catalogue_title fl catalogue_titleweight" style=" margin-top: 10px;
                                                                                   font-size: 14px;
                                                                                   font-weight: 700;">{{ item.name }}
                      </span>
                    </li>
                    <div v-for="(chapter,n) in item.children">
                      <li class="clearfix video current_play">
                        <div class="fl cataloguediv-c">
                                                         <span class="catalogue_title3 fl cataloguediv-l">
                                  <b class="pl5 hour">{{ i + 1 }}.{{ n + 1 }}</b>
                                </span>
                                  <span
                                      :title="chapter.name"
                                      @click="changeVideo(chapter.video)"
                                      class="catalogue_title"
                                      style="cursor: pointer;">
                                      {{ chapter.name }}
                                  </span>
                          <span @click="comment(chapter.courseId)">
                            <el-button type="primary">章节评论区</el-button>
                          </span>
                        </div>
                      </li>

                    </div>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>

</template>
<script>
import VideoPlayer from "@/components/video/VideoPlayer";

export default {
  name: "Main",
  data() {
    return {
      key: 0,
      dataList: [],
      name: '',
      src: "https://vdse.bdstatic.com//192d9a98d782d9c74c96f09db9378d93.mp4?authorization=bce-auth-v1/40f207e648424f47b2e3dfbb1014b1a5/2021-07-12T02:14:24Z/-1/host/530146520a1c89fb727fbbdb8a0e0c98ec69955459aed4b1c8e00839187536c9",
      dataListLoading: false,
      addOrUpdateVisible: false,
      getId:'1',
      courseId:''
    };
  },
  components: {
    VideoPlayer
  },
  mounted() {
    this.getId=this.$route.query.id
    // console.log(this.getId)
    // console.log(this.$route.query.id)
    // console.log(2122)
    // 获取数据列表
    this.dataListLoading = true;

    this.axios({
      url: "course/coursetree/list/course",
      params:{
        getId:this.getId
      },
      method: "get"
    }).then((res) => {
      // console.log(data,111)
      this.dataList = res.data.page[0].children;
      this.name = res.data.page[0].name
      this.courseId=res.data.page[0].courseId
      // console.log(this.courseId)
      // console.log(this.name)
      // console.log(this.dataList, 111)
    });
  },
  methods: {
    changeVideo(video) {
      this.src = video
      this.key = this.key + 1
      // console.log(this.src)
    },
    coursedes(){
      this.$router.push({
        name:"coursedescription",
        query:{
          courseId:this.courseId
        }
      });
    },
    tuijian() {
      this.$router.push({
        path:"/recommend",
      });
    },
    returnmain(){
      this.$router.push("/main");
    },
    comment(id){
      console.log(111)
      if(id==0){
        this.$router.push({
          name:"comment",
          query:{
            courseId:this.courseId
          }
        });
      }else {
        this.$router.push({
          name:"comment",
          query:{
            courseId:id
          }
        });
      }
    }
  }
};
</script>

<style>
.show-course {
  margin-right: 5px;
  height: 80px;
  list-style: none;
  float: left;
  width: 100px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #bfbfbf;
  cursor: pointer;
}
.video-study .el-aside .box-content .box-right .newListTest li a .icon {
  width: 40px;
  height: 40px;
}
.video-study .el-aside .box-content .box-right .newListTest {
  padding: 0 15px;
  overflow: hidden;
  clear: both;
  background: white;
}

.video-study .box-content .box-right .topicTitle ul .tabTitle {
  font-size: 14px;
  color: #2a2a2a;
  line-height: 40px;
}

.el-container {
  height: 100%;
  weight: 100%
}

.video-study .box-content .box-right .topicTitle {
  width: 340px;
  height: 40px;
  background: #f6f6f6;
}

* {
  margin: 0;
  padding: 0;
}

.chapter-em .fl {
  background: url("../../assets/image/节分枝-白.png") no-repeat;
  width: 11px;
  height: 11px;
  display: inline-block;
  position: absolute;
  left: 64px;
  top: 20px;
}

.video-study .box-content .box-right .list .font_gray_inclined .chapter-em {
  background: url("../../assets/image/节分枝-白.png") no-repeat;
  width: 11px;
  height: 11px;
  display: inline-block;
  margin: 13px 0 0 3px;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-header .banner .source-con .source-name {
  /*overflow: hidden;*/
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
  height: 30px;
  margin: 0;
  color: #fff;
  font-size: 14px;
}

.el-header .banner .source-con {
  position: absolute;
  left: 50%;
  text-align: center;
  top: 0;
  width: 330px;
  height: 37.6px;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  margin-top: 10px;
}

.el-header .banner .source-con .source-down {
  margin-top: 5px;
  display: inline;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  weight: 48%;
  position: absolute;
  margin-left: 77%;
  margin-top: 5%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  width: 75%;
  height: 90%;
  z-index: 1;
  position: absolute;
  margin-top: 5%;

}

.el-header {
  height: 12%;
  color: #3d4059;
  background: #3d84ff;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%);
  z-index: 30;
  position: fixed;
  width: 100%;
  padding: 0 62px;
  left: 0;
}

.el-header .banner {
  margin: 0 auto;
  min-width: 1200px;
  height: 60px;
  position: relative;
}

.el-header .banner .back {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  line-height: 60px;
  opacity: .75;
  display: inline;
  cursor: pointer;
  position: absolute;
  left: 7%
}

.el-header .banner .tuijian {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  line-height: 60px;
  opacity: .75;
  display: inline;
  cursor: pointer;
  position: absolute;
  left: 60%;
  margin: 0;
}

a, b, blockquote, body, button, code, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, i, input, legend, li, ol, p, pre, span, td, textarea, th, ul {
  font-family: -apple-system, BlinkMacSystemFont, SF Pro SC, SF Pro Text, Helvetica Neue, Helvetica, PingFang SC, Segoe UI, Roboto, Hiragino Sans GB, arial, Source Han Sans CN, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
