<template>
  <el-card shadow="hover" :body-style="{ padding: 0 }" class="post">
    <header slot="header" class="post-header">
      <h3>{{ post.title }}</h3>
      <small>
        <i class="el-icon-time"></i>
        {{ new Date(post.date).toLocaleString() }}
      </small>
    </header>
    <div class="post-body">
      <img :src="post.imageUrl" alt="post image" class="post-image" />
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">Открыть</el-button>
      <span>
        <i class="el-icon-message"></i>
        {{ post.comments.length }}
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPost() {
      this.$router.push(`/post/${this.post._id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin-bottom: 1.5rem;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-image {
  width: 100%;
  height: auto;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
</style>
