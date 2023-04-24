<template>
  <div class="index_page">
    <y-header :active="'index'"/>
    <y-banner :data="carouselData" :height="366" :category-list="categoryData"/>
    <div v-for="(item, index) in zoneData" :key="index" class="i_content">
      <div class="i_zone">
        <div class="zone_header">
          <div class="big_text">
            <span class="col_block"/>
            {{ item.zoneName }}
            <span class="small_text">{{ item.zoneDesc }}</span>
            <router-link target="_blank" :to="{ name: 'main' }" class="fr small_text link_text">   更多相似课程(该功能暂未实现) ></router-link>
          </div>
        </div>
        <div class="zone_body">
          <ul class="clearfix course_list">
            <li style="list-style: none" v-for="(that, int) in item.courseList" :key="int">
              <router-link target="_blank" :to="{ name: 'home', query: { id: that.id } }">
                <div class="img_box">
                  <img :src="that.courseLogo" alt="">
                </div>
                <p>{{ that.courseName }}</p>
                <span v-if="that.coursePrice === 0" class="price_box">免费</span>
                <span v-else class="price_box">￥{{ that.coursePrice }} <span
                    style="text-decoration-line: line-through;font-size: 12px">￥{{ that.rulingPrice }}</span></span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--    <y-footer />-->
    <!--    <right-tap />-->
  </div>
</template>
<script>
import YHeader from '@/components/common/Header'
import YBanner from '@/components/common/Banner'

export default {
  components: {
    YHeader,
    YBanner,
    // YFooter,
    // RightTap
  },


  data() {
    return {
      zoneData: [],
      categoryData: [],
      carouselData: [],
      websiteInfo: {
        "websiteDomain": "https://dev-os.roncoos.com/",
        "websiteName": "领课教育系统",
        "websiteDesc": "领课网络·为企业和培训机构在线培训提供一站式解决方案，包括录播、直播、班级、考试、证书等在线培训工具，且提供网校定制，网校开发，网校搭建等全生命周期的管理与服务。",
        "websiteLogo": "https://static.roncoos.com/os/10.png",
        "websiteIcon": "https://file.roncoos.com/education/education/3c55cc236d1c41e7825fe553606ebe6d.png",
        "websiteIcp": "粤ICP备16009964号 -1",
        "websitePrn": "粤公网安备44010602005928号",
        "websitePrnNo": "44010602005928",
        "websiteCopyright": "© 2016-现在 广州市领课网络技术有限公司",
        "websiteUserAgreement": "<p>一、用户协议总则<br/>1、本协议双方为广州市领课网络科技有限公司（以下简称：领课网络）旗下的领课教育系统（域名为：<a href=\"https://eduos.roncoo.net/\" target=\"_blank\">https://eduos.roncoo.net/</a>）和领课教育系统的注册用户（以下简称：用户）。<br/>2、用户在注册前请仔细阅读本协议的条款，并按照页面上的提示完成全部注册程序。<br/>3、用户在进行注册过程中点击“同意”按钮，即表示用户已充分知悉和完全接受本协议项下全部条款，进而与领课教育系统达成本协议。<br/><br/>二、用户服务使用说明<br/>1、用户在注册时应按照注册提示填写准确的用户名、密码及真实的联系邮箱、手机号码等相关个人资料，符合完整、准确的要求。<br/>2、用户一旦注册成功，便成为领课教育系统网站合法的注册用户，将获得本网站的一个用户账号和相应密码，用户可随时修改自己的用户密码。用户应对其账号和密码安全负全部责任，并应对其用户名下所进行的所有行为和事件承担相应的法律责任。<br/>3、用户同意接受领课教育系统网站通过电子邮件或其他方式向用户发送有关商业信息。<br/>4、领课教育系统网站不对用户所发布信息的删除或储存失败负责。<br/>5、领课教育系统网站不提供账号删除服务，如果用户需要删除账号，请直接放弃使用即可。<br/>6、领课教育系统网站有判定用户的行为是否符合本网站服务条款要求的权利，如果用户违背了服务条款的规定，本网站有权对其用户所提供的网络服务进行中断或停止使用。<br/>7、用户不得以任何非法目的或其它方式对领课教育系统网站的个人用户账号进行转让、转借、倒卖、账号共享等行为（用户账号仅限由其本人使用）。<br/><br/>三、协议内容的变更和修订<br/>1、领课教育系统网站有权在必要时修改服务条款，领课教育系统网站服务条款一旦发生变动，将会在重要页面上提示修改内容。<br/>2、用户如果不同意领课教育系统所改动的内容，可自行停止使用本站网络服务。<br/>3、如果用户继续享用本站网络服务，则视为同意接受本网站服务条款的变动。<br/>4、领课教育系统网站可随时根据实际情况中断或终止一项或多项网络服务而无需对任何用户或第三方承担任何责任，如用户对一项或多项网络服务的中断或终止有异议，可以行使如下权利：<br/>（1）自行停止使用领课教育系统网站的网络服务。<br/>（2）通知领课教育系统网站停止对该用户的服务。 结束用户服务后，用户使用网络服务的权利立即终止，从终止时起，用户没有权利再进行处理任何未完成的信息或服务，领课教育系统网站也没有义务为其传送任何未处理的信息或未完成的服务给用户或任何第三方。<br/><br/>四、用户隐私条款<br/>领课教育系统网站将严格履行用户个人隐私保密义务，承诺不公开、编辑或透露用户个人信息，但以下特殊情况除外：<br/>1、经注册用户事先许可授权。<br/>2、遵守国家法律法规或配合相关政府部门的要求。<br/>3、遵从领课教育系统网站合法服务程序。<br/>4、为维护社会公众利益以及领课教育系统网站的合法权益所必须。<br/><br/>五、注册用户的权利与义务<br/>1、注册用户在使用领课教育系统网站服务时，必须遵守中华人民共和国相关法律法规的规定，用户应同意将不会利用本服务进行任何违法或不正当的活动，否则用户将自行承担由此产生的一切法律责任。<br/>2、用户在账号使用过程中不得上载、展示、张贴、传播或以其它方式传送含有下列内容之一的信息：<br/>（1） 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的。<br/>（2） 损害国家荣誉和利益的。<br/>（3） 煽动民族仇恨、民族歧视、破坏民族团结的。<br/>（4） 破坏国家宗教政策，宣扬邪教和封建迷信的。<br/>（5） 散布谣言，扰乱社会秩序，破坏社会稳定的。<br/>（6） 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的。<br/>（7） 侮辱或者诽谤他人，侵害他人合法权利的。<br/>（8） 含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容。<br/>3、不得为任何非法目的而使用网络服务系统。<br/>4、不得利用领课教育系统网站服务故意制作、传播计算机病毒等破坏性程序，或其他从事任何危害计算机信息网络安全的行为。<br/>5、若用户行为违反上述约定，领课教育系统网站有权作出独立判断并立即取消用户的服务账号，用户应对自己网上的行为承担一切法律责任，领课教育系统网站的系统记录有可能作为用户违反法律的证据提交给相关主管部门。<br/>6、用户应同意保障和维护领课教育系统网站全体成员及其他用户的利益，如因违反本协议或违反有关的法律法规而给领课教育系统网站或任何第三者造成损失，用户应承担因此产生的法律责任。<br/><br/>六、领课教育系统网络服务内容的所有权<br/>1、领课教育系统网站定义的网络服务内容包括但不限于：教学视频、资料、源码、文字、软件、声音、图片、商标等。该等内容均受《著作权法》、《商标法》、《专利法》、《计算机软件保护条例》及其他相关法律法规的保护。<br/>2、领课教育系统网站所有的文章版权归原文作者和领课教育系统网站共同所有，任何人需要转载本网站版内的文章，必须事先取得原文作者和领课教育系统网站的授权同意。<br/>3、未经领课教育系统网站或其他有权第三方的事先许可授权，用户不得对包括但不限于：教学视频</p>"
      }
    }
  },
  head() {
    return {
      title: "领课教育系统",
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: ""
        },
        {
          hid: 'description',
          name: 'description',
          content: "领课网络·为企业和培训机构在线培训提供一站式解决方案，包括录播、直播、班级、考试、证书等在线培训工具，且提供网校定制，网校开发，网校搭建等全生命周期的管理与服务。"
        }
      ]
    }
  },

  mounted() {
    this.axios.get("/course/coursetree/list/lingketree")
        .then((res) => {
          // console.log(res.data.page)
          this.categoryData = res.data.page
        })

    this.axios.get("/sort/carousel/list")
        .then((res) => {
          // console.log(res.data.page.list)
          this.carouselData = res.data.page.list
        })

    this.axios.get("/sort/sort/list/zone")
        .then((res) => {
          // console.log(res.data.page.list)
          this.zoneData = res.data.page
          console.log(res.data.page)
        })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.videoAlert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  .videoAlertbox {
    position: absolute;
    width: 420px;
    top: 50%;
    left: 50%;
    height: 472px;
    margin: -246px 0 0 -210px;

    .videoAlertImg {
      height: 472px;
      width: 420px;
    }

    .videoAlertClone {
      position: absolute;
      bottom: -40px;
      left: 50%;
      margin-left: -16px;
      width: 32px;
      font-size: 30px;
      height: 32px;
      border-radius: 20px;
    }
  }
}

.index_page {
  .clearfix:before,
  .clearfix:after {
    content: "";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .i_content {
    background: #f6f8fb;

    .i_zone {
      width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
    }
  }

  .zone_header {
    .col_block {
      display: inline-block;
      width: 4px;
      height: 24px;
      background: #333;
      position: relative;
      top: 4px;
    }

    .big_text {
      // text-align: center;
      font-size: 24px;
    }

    .small_text {
      // text-align: center;
      font-size: 14px;
      color: #999;
      margin-top: 10px;
    }

    .link_text:hover {
      text-decoration: none;
      color: #333;
    }
  }

  .zone_body {
    margin-top: 25px;
  }

  .course_list {
    li {
      float: left;
      width: 285px;
      height: 222px;
      border-radius: 6px;
      margin: 0px 20px 20px 0px;

      &:nth-child(4n) {
        margin-right: 0px;
      }

      &:hover {
        box-shadow: 0px 3px 18px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
        transition: all 0.3s;
      }

      a {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        background: #fff;
        border-radius: 6px;

        .img_box {
          width: 285px;
          height: 158px;
          position: relative;

          .qizi {
            background: url(../assets/image/activity/qizi.png) no-repeat center;
            position: absolute;
            top: 0;
            left: 10px;
            width: 46px;
            height: 46px;
            color: #fff;
            font-size: 14px;
            text-align: center;
          }

          img {
            width: 285px;
            height: 158px;
            border-radius: 6px 6px 0 0;
          }

          .live_time {
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 12px;
            line-height: 16px;
            width: 285px;
            background: rgba(0, 0, 0, 0.2);
            color: #fff;
            padding-bottom: 2px;
          }
        }

        &:hover {
          color: #000;
          text-decoration: none;
        }

        p {
          font-size: 16px;
          margin-top: 5px;
          padding-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-all;
        }

        .price_box {
          font-size: 16px;
          position: absolute;
          bottom: 10px;
          left: 10px;
          color: red;
        }
      }
    }
  }

  .test_list {
    .test_option {
      float: left;
      width: 520px;
      padding: 18px 25px;
      margin-right: 55px;
      margin-bottom: 20px;
      border-radius: 8px;
      font-size: 14px;
      background-color: #fff;

      &.right_0 {
        margin-right: 0px;
      }
    }

    .iconfont {
      margin-right: 6px;
    }
  }
}
</style>
