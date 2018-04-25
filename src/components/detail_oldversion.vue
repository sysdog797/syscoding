<template>
<div class="detail">
  <p>
        <span>
            <a class="edit">编辑</a>
        </span>
        <span>
            <a class="edit">删除</a>
        </span>
    </p>
    <p>
        <h2>
            <a>
                {{data.title}}
            </a>
        </h2>
    </p>
    <p class="info">
        作者：
        <a>
            {{data.author}}
        </a> | 日期：
        {{data.publishTime}} | 浏览：
            {{data.pv}}
    </p>
    <p>
        {{data.article}}
    </p>
    
        <img v-if="data.postImg" :src="'/images/'+data.postImg" alt="" style="width:100%;height:100%;">
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
    this.loadData();
    console.log(this.$route.params.id);
    console.log(this.data);
  },
  methods: {
    loadData: function() {
      var _this = this;
      var _id = this.$route.params.id;
      var ajax = $.ajax({
        type: "GET",
        url: "/api/getDetail?id=" + _id,
        success: function(resp) {
          if (resp) {
            console.log(resp);
            _this.data = resp.post;
          } else {
            console.log("no article");
          }
        },
        error: function() {
          console.log("session error");
          return;
        }
      });
    }
  }
};
</script>
