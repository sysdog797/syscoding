<template>
  <div class="index">
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
    <div class="show-box">
        <video autoplay loop="true" muted="true">
            <source type="video/mp4" media="screen and (min-width:1025px)" src="https://webcn.tap4fun.com/cn/fstatic/info/info/video/7f/6995487f7bf6b0a6beb9e217e4a88a.mp4">
        </video>
    </div>
    <div class="slogan"><span>HE BEATS THE BUZZER</span></div>
    <div class="video-mask"></div>
    <div class="video-position"></div>
    <!-- article list -->
    <div class="main-box" v-show="listview">
      <div class="list-container">
          <div class="cards-wall">
            <ul v-for="(data,index) in datas">
              <li v-if="(index%8)<4" class="img-box">
                  <a class="mix-img" target="_blank" v-bind:style="{backgroundImage:'url(/static/images/test'+data.number+'.jpg)'}"></a>
              </li>
              <router-link target="_blank" :to="'/index/detail/'+data.number" v-if="(index%8)<4" class="cards-mask"></router-link>
              <li v-if="(index%8)<4" class="cards-content">
                  <h3>
                      <router-link :to="'/index/detail/'+data.number" target="_blank" >{{data.title}}</router-link>
                  </h3>
                  <div class="media-box">
                    <h5 class="m_heading">
                      <div class="author-namebox">
                          <a target="_blank" :href="'https://github.com/'+data.user.login" class="author-name">{{data.user.login}}</a>
                      </div>
                      <span>·</span>
                      {{data.created_at}}
                    </h5>
                  </div>
              </li>
              <li v-if="(index%8)>3" class="img-box-s">
                  <a target="_blank"><img width="285" height="190" :src="'/static/images/test'+data.number+'.jpg'"></a>
              </li>
              <li v-if="(index%8)>3" class="cards-content-s">
                  <h3><router-link :to="'/index/detail/'+data.number" target="_blank">{{data.title}}</router-link></h3>
                  <p class="hidex3">{{data.body}}</p>
              </li>
              <li v-if="(index%8)>3" class="author-box-s">
                  <div class="media-box">
                      <div class="author-avator"><a target="_blank"><img class="img-rounded" :src="'/static/images/author'+(index%4+1)+'.jpeg'"></a></div>
                      <div class="m_body">
                          <h5 class="m_heading">
                              <div class="name-box">
                                  <a target="_blank">{{data.user.login}}</a>
                                  <span>·</span>
                                  {{data.created_at}}
                              </div>
                          </h5>
                      </div>
                  </div>
              </li>
            </ul> 
          </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: Boolean,
      startPost: false,
      startLogin: false,
      startReg: false,
      listview: true,
      datas: [],
      user: "",
      username: "",
      password: "",
      newuser: "",
      newpwd: "",
      repwd: "",
      mail: ""
    };
  },
  created: function() {
    var _this = this;
    var ajax = $.ajax({
      type: "GET",
      //url: "/api/getArticle",
      url: "https://api.github.com/repos/Ganother/blog/issues",
      success: function(resp) {
        if (resp) {
          console.log(resp);
          _this.datas = resp;
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
  methods: {
    detailLink: function(number) {
      console.log(number);
    }
  }
};
</script>

<style lang="less">
.index {
  position: relative;
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
  .show-box {
    position: absolute;
    height: 760px;
    width: 100%;
    z-index: 1;
  }
  .slogan {
    position: absolute;
    top: 255px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    z-index: 11;
    color: #fff;
  }
  .video-mask {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 530px;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .video-position {
    height: 760px;
    width: 100%;
  }
  .main-box {
    position: relative;
    background-color: #f2f2f2;
    top: -270px;
    z-index: 11;
    width: 100%;
    .list-container {
      width: 60rem;
      margin: 0 auto;
      .cards-wall {
        min-height: 100vh;
        padding-top: 20px;
        ul:hover {
          background: #ffffff;
          box-shadow: 0 15px 15px 0 rgba(15, 37, 64, 0.1);
          border-radius: 2px;
          z-index: 2;
          .mix-img {
            transform: scale(1.2);
          }
        }
        ul:nth-child(8n + 4),
        ul:nth-child(8n + 1),
        ul:nth-child(8n + 2),
        ul:nth-child(8n + 3) {
          padding: 10px;
          width: 50%;
          margin: 0 10px 18px 0;
          float: left;
          height: 410px;
          border-radius: 2px;
          position: relative;
          .img-box {
            width: 100%;
            height: 100%;
            padding: 0;
            background-color: #fff;
            position: relative;
            overflow: hidden;
            .mix-img {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 2px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              transition: all 0.4s ease;
            }
          }

          .cards-mask {
            position: absolute;
            top: 10px;
            bottom: 10px;
            left: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.25);
          }
          .cards-content {
            width: 485px;
            position: absolute;
            left: 50px;
            bottom: 50px;
            background: transparent;
            padding: 0;
            display: block;
            h3 {
              font-size: 24px;
              letter-spacing: 0;
              line-height: 34px;
              overflow: hidden;
              text-overflow: -o-ellipsis-lastline;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              max-height: 68px;
              margin-bottom: 2px;
              a {
                color: #ffffff;
              }
              a:link,
              a:visited,
              a:hover,
              a:active {
                text-decoration: none;
                cursor: pointer;
              }
            }
            .media-box {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              width: 231px;
              .m_heading {
                line-height: 12px;
                font-weight: 100;
                color: #fff;
                font-size: 0.6rem;
                letter-spacing: 0;
                margin-bottom: 0;
                .author-namebox {
                  display: inline-block;
                  position: relative;
                  font-weight: lighter;
                  .author-name {
                    color: #fff;
                    font-weight: normal;
                  }
                  a:link,
                  a:visited,
                  a:hover,
                  a:active {
                    text-decoration: none;
                  }
                }
                span {
                  font-family: Georgia;
                  font-size: 0.8rem;
                  font-weight: bold;
                  line-height: 1.2rem;
                  padding: 0 0.3rem;
                }
              }
            }
          }
        }
        ul:nth-child(8n + 5),
        ul:nth-child(8n + 6),
        ul:nth-child(8n + 7),
        ul:nth-child(8n) {
          padding: 8px;
          width: 25%;
          margin: 0 3.3px 0 0;
          float: left;
          height: 410px;
          border-radius: 2px;
          position: relative;
          .img-box-s {
            width: 100%;
            padding: 0;
            background-color: #fff;
            position: relative;
            display: block;
            a {
              width: 100%;
              display: block;
              overflow: hidden;
              max-height: 30rem;
              position: relative;
              background: #fff;
              img {
                max-width: 100%;
                vertical-align: top;
              }
            }
          }
          .cards-content-s {
            width: 100%;
            position: relative;
            float: none;
            margin-bottom: 0;
            padding: 0 0.5rem;
            border: none;
            background-color: #fff;
            padding-top: 0.7rem;
            h3 {
              font-weight: bold;
              margin-bottom: 0;
              font-size: 0.8rem;
              color: #333333;
              letter-spacing: 0;
              overflow: hidden;
              max-height: 2.6rem;
              line-height: 1.3rem;
              a {
                text-decoration: none;
                color: #333333;
                font-weight: bold;
              }
            }
            p {
              margin-top: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 8;
              -webkit-box-orient: vertical;
              height: auto;
              text-align: justify;
              font-size: 0.65rem;
              color: #999;
              letter-spacing: 0;
              line-height: 1rem;
              padding: 0.1rem 0 0;
              margin: 0;
              font-weight: 300;
            }
            .hidex3 {
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }
          }
          .author-box-s {
            width: 100%;
            float: none;
            margin-bottom: 0;
            padding: 0 0.5rem;
            border: none;
            background-color: #fff;
            position: relative;
            display: block;
            .media-box {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              padding-top: 0.7rem;
              .author-avator {
                position: relative;
                padding-bottom: 0.5rem;
                a {
                  display: block;
                  width: 1.2rem;
                  height: 1.2rem;
                  overflow: hidden;
                  border-radius: 50%;
                  position: relative;
                  text-decoration: none;
                  .img-rounded {
                    display: block;
                    border-radius: 6px;
                    border: none;
                    max-width: 100%;
                  }
                }
              }
              .m_body {
                width: 231px;
                .m_heading {
                  font-size: 0.6rem;
                  color: #999;
                  letter-spacing: 0;
                  line-height: 1.2rem;
                  margin-bottom: 0;
                  margin-top: 0;
                  .name-box {
                    display: inline-block;
                    position: relative;
                    a {
                      color: #666666;
                      font-weight: bold;
                      text-decoration: none;
                    }
                    span {
                      font-size: 0.8rem;
                      font-weight: bold;
                      line-height: 1.2rem;
                      padding: 0 0.3rem;
                    }
                  }
                }
              }
            }
          }
        }
        ul:nth-child(2),
        ul:nth-child(4),
        ul:nth-child(10),
        ul:nth-child(12) {
          margin-right: -10px;
        }
        ul:nth-child(1),
        ul:nth-child(3),
        ul:nth-child(5),
        ul:nth-child(9),
        ul:nth-child(11),
        ul:nth-child(13) {
          margin-left: -10px;
        }
        ul:nth-child(8) {
          margin-right: -10px;
        }
      }
    }
  }
}
</style>

