<template>
  <div class="course_detail">
    <y-detail ref="watchVideo" :course-info="courseInfo" :teacher-info="teacherInfo"/>
    <div class=" detail_info detail_box clearfix" style="border-style: solid">
      <div class="layout_left" style="position: relative;top:-180px">
        <ul class="course_tab clearfix" style="list-style: none">
          <li :class="{on: tab == 'info'}"><a href="javascript:" @click="tab = 'info'">课程介绍</a></li>
          <li :class="{on: tab == 'big'}"><a :href="courseInfo.pdf">点击此处下载该课程pdf课件</a></li>
        </ul>
        <div v-if="tab == 'info'" class="content_info">
          <div class="introduce" v-html="courseInfo.introduce"/>
        </div>
        <div v-if="tab == 'big'" class="content_info">
          <y-catalog :list="courseInfo.chapterRespList" :play-period="playPeriod" @playfunc="videoPlay"/>
        </div>
      </div>
      <div class="layout_right" style="position: relative;top:-180px">
        <div class="teacher_info clearfix" style="text-align: left">
          <span class="head" style="text-align: left">讲师简介</span>
          <div class="teacher_msg">
            <div v-if="teacherInfo" class="teacher_msg_right">
              <img v-if="teacherInfo.lecturerHead" class="teacher_phone" :src="teacherInfo.lecturerHead" alt="">
              <img v-else class="teacher_phone" src="../../src/assets/ico/ziliao.png" alt="">
              <div class="teacher_name">{{ teacherInfo.lecturerName }}</div>
              <div class="teacher_position">{{ teacherInfo.lecturerPosition }}</div>
              <div class="info_box" v-html="teacherInfo.introduce"/>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- <bottom /> -->
  </div>
</template>
<script>
import YDetail from '@/components/course/Detail'


export default {
  components: {
    // Bottom,
    YDetail,

  },
  data() {
    return {
      tab: 'info',
      playPeriod: '', // 当前播放课时
      userStudy: {}, // 进度,,
      title: "TestTitle",
      courseInfo: {},
      teacherInfo: {},
      courseId: 0
    }
  },
  mounted() {
    this.courseId = this.$route.query.courseId

    this.axios({
      url: "product/teacher/getinfo",
      params: {
        courseId: this.courseId
      },
      method: "get"
    }).then((res) => {
      // console.log(data,111)
      this.teacherInfo = res.data.data
      // console.log(this.dataList, 111)
    });
    this.axios({
      url: "product/courserdes/info/des",
      params: {
        courseId: this.courseId
      },
      method: "get"
    }).then((res) => {
      // console.log(data,111)
      this.courseInfo = res.data.data
      // console.log(this.dataList, 111)
    });

  },
  methods: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">
.course_detail {
  .detail_info {
    margin: 20px auto 60px;
    width: 1200px;
  }

  .layout_left {
    width: 920px;
    float: left;

    .info_body {
      margin-bottom: 30px;
    }
  }

  .course_tab {
    padding-left: 30px;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 20px;

    li {
      float: left;
      height: 66px;
      line-height: 66px;
      margin-right: 80px;

      &.on {
        border-bottom: 2px solid #D51423;

        a {
          color: #D51423;
        }
      }

      a {
        color: #000;
        font-size: 14px;
        font-weight: 700;

        &:hover {
          text-decoration: none;
          color: #D51423;
        }
      }
    }
  }

  .content_info {
    padding: 30px;
    background: #fff;
    border-radius: 8px;
    min-height: 400px;

    .title {
      border-left: 3px solid #000;
      padding-left: 12px;
      font-size: 16px;
      color: #000;
      font-weight: 700;
      margin-bottom: 25px;
    }

    .introduce {
      font-size: 14px;
      line-height: 30px;
      color: #333;
      padding-left: 8px;
    }
  }

  .layout_right {
    width: 260px;
    float: right;
  }

  .teacher_info {
    background: #fff;
    border-radius: 8px;
    position: relative;
    min-height: 180px;

    .head {
      display: block;
      line-height: 60px;
      height: 60px;
      padding-left: 20px;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid rgb(228, 228, 228);
    }

    .teacher_phone {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgb(228, 228, 228);
      text-align: center;
      line-height: 46px;
      font-size: 13px;
      color: #999;
      float: left;
      margin: 0px 10px 0 10px;

      img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
      }
    }

    .teacher_msg_right {
      width: 235px;
      float: right;
      margin: 12px 15px 12px 12px;
      line-height: 20px;
    }

    .teacher_name {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 5px 0;
    }

    .teacher_position {
      font-size: 12px;
      color: #333;
      margin-bottom: 5px;
    }
  }
}
</style>
