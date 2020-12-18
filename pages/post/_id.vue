<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="16" :lg="14">
      <article class="post">
        <div class="post-body">
          <header class="post-header">
            <div class="post-title">
              <h1>{{ post.title }}</h1>
              <nuxt-link to="/">
                <i class="el-icon-back"></i>
              </nuxt-link>
            </div>
            <div class="post-info">
              <small>
                <i class="el-icon-time"></i>
                {{ post.date | date }}
              </small>
              <small>
                <i class="el-icon-view"></i>
                {{ post.views }}
              </small>
            </div>
            <div class="post-image">
              <img :src="post.imageUrl" alt="post image" />
            </div>
          </header>
          <main class="post-content">
            <!-- eslint-disable-next-line prettier/prettier -->
            <vue-markdown>{{ post.text }}</vue-markdown>
          </main>
        </div>
        <footer>
          <app-comment-form
            v-if="canAddComment"
            :post-id="post._id"
            @created="createCommentHandler"
          />
          <div v-if="post.comments.length" class="comments">
            <app-comment
              v-for="comment in post.comments"
              :key="comment._id"
              :comment="comment"
            />
          </div>
          <div v-else class="text-center">Комментариев нет</div>
        </footer>
      </article>
    </el-col>
  </el-row>
</template>

<script>
import AppComment from '@/components/main/Comment';
import AppCommentForm from '@/components/main/CommentForm';
export default {
  components: { AppComment, AppCommentForm },
  validate({ params }) {
    return Boolean(params.id);
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch('post/fetchById', params.id);
    await store.dispatch('post/addView', post);
    return { post: { ...post, views: ++post.views } };
  },
  data() {
    return {
      canAddComment: true,
    };
  },
  methods: {
    createCommentHandler(comment) {
      this.post.comments.unshift(comment);
      this.canAddComment = false;
    },
  },
  head() {
    return {
      title: `${this.post.title} | ${process.env.appName}`,
    };
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin: 0 auto;
}

.post-body {
  padding: 30px 20px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  margin-bottom: 2rem;
}

.post-title,
.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-info {
  margin-bottom: 0.5rem;
}

.post-image img {
  width: 100%;
  height: auto;
}

.post-header {
  margin-bottom: 1.5rem;
}
</style>
