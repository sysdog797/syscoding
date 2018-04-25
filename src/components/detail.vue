<template>
  <div class="detail">
    <!-- header -->
    <div class='topnav'>
        <nav class="nav-bar" role="navigation">
            <div class="header">
                <div class="brand-logo">
                    <router-link class="brand" to="/index"><img src="/static/images/logo.png"></router-link>
                </div>
            </div>
        </nav>
    </div>
    <!--  img-box  -->
    <div class="headline">
      <div class="background-box" v-bind:style="{backgroundImage:'url(/static/images/test'+this.$route.params.id+'.jpg)'}"></div>
      <div class="mask"></div>
      <h2 class="title">
        <span>{{data.title}}</span>
      </h2>
      <div class="article-info">
        <div class="info-box">
          <div class="author-avator">
            <a target="_blank" :href="'https://github.com/'+data.user.login">
              <img :src="'/static/images/author'+data.number+'.jpeg'">
            </a>
          </div>
          <div class="author-name">{{data.user.login}}</div>
          <span class="dot">·</span>
          <i>{{data.created_at}}</i>
        </div>
      </div>
    </div>
    <!-- main-container -->
    <div class="main-container">
      <div class="content">{{data.body}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  created: function() {
    var _this = this;
    var url =
      "https://api.github.com/repos/Ganother/blog/issues/" +
      this.$route.params.id;
    var ajax = $.ajax({
      type: "GET",
      url: url,
      success: function(resp) {
        if (resp) {
          //console.log(resp);
          _this.data = resp;
        } else {
          console.log("no article");
        }
      },
      error: function() {
        console.log("session error");
        return;
      }
    });
  },
  methods: {}
};
</script>

<style lang="less">
.detail {
  position: relative;
  margin-bottom: 330px;
}
.topnav {
  .nav-bar {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 101;
    background-color: rgba(0, 0, 0, 0.8);
    .header {
      margin: 0 1.7rem;
      position: relative;
      height: 3rem;
      font-size: 0.75rem;
      color: #9c9c9c;
      .brand-logo {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        .brand {
          color: #9c9c9c;
          img {
            height: 35px;
          }
        }
      }
      .navul {
        margin-right: 0;
        .navli {
          margin-left: 15px;
          a {
            color: #9c9c9c;
            line-height: 3rem;
            padding: 0;
          }
        }
      }
    }
  }
  .show-box {
    background-color: #666;
    width: 100%;
    position: relative;
    video {
      position: absolute;
      top: 0;
      z-index: 1;
    }
  }
}
.headline {
  position: relative;
  width: 100%;
  height: 35rem;
  .background-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .title {
    font-size: 3rem;
    line-height: 4rem;
    width: 60rem;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    bottom: 8rem;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    padding: 0;
    font-weight: 500;
    span {
      color: #fff;
      overflow: hidden;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  .article-info {
    position: absolute;
    left: 50%;
    bottom: 0.5rem;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60rem;
    margin: 0 auto;
    .info-box {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      .author-avator {
        position: relative;
        padding-bottom: 0.5rem;
        a {
          display: block;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 1px solid #fff;
          margin-right: 6px;
          overflow: hidden;
          position: relative;
          text-decoration: none;
          img {
            max-width: 100%;
            vertical-align: top;
          }
        }
      }
      .author-name {
        position: relative;
        padding-bottom: 0.5rem;
        font-size: 0.7rem;
        font-weight: 400;
        height: 35px;
        line-height: 35px;
        color: #fff;
        display: block;
      }
      .dot {
        color: #fff;
        font-family: Georgia;
        font-size: 0.8rem;
        font-weight: bold;
        line-height: 34px;
        padding: 0 0.3rem;
      }
      i {
        position: relative;
        padding-bottom: 0.5rem;
        font-size: 0.7rem;
        font-weight: 200;
        height: 35px;
        line-height: 35px;
        color: #fff;
        display: block;
      }
    }
  }
}
.main-container {
  .content {
    font-size: 0.8rem;
    line-height: 1.5rem;
    color: #333;
    letter-spacing: 0;
    padding: 80px 170px 0;
    text-align: justify;
    width: 60rem;
    margin: 0 auto;
    word-wrap: break-word;
  }
}
</style>
