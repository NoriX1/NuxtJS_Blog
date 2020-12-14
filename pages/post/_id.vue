<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="16" :lg="14">
      <article class="post">
        <header class="post-header">
          <div class="post-title">
            <h1>Post title</h1>
            <nuxt-link to="/">
              <i class="el-icon-back"></i>
            </nuxt-link>
          </div>
          <div class="post-info">
            <small>
              <i class="el-icon-time"></i>
              {{ new Date().toLocaleString() }}
            </small>
            <small>
              <i class="el-icon-view"></i>
              42
            </small>
          </div>
          <div class="post-image">
            <img
              src="https://s0.rbk.ru/v6_top_pics/resized/1180xH/media/img/3/06/755813427125063.jpg"
              alt="post image"
            />
          </div>
        </header>
        <main class="post-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis obcaecati sed quo, tenetur modi sunt.
          </p>
          <p>
            Officia omnis ea, asperiores iure, laboriosam aspernatur porro
            facere maxime, nobis consectetur est ullam molestiae!
          </p>
          <p>
            Totam maxime inventore molestiae rem ad debitis, recusandae quasi et
            ratione delectus quam ea magnam.
          </p>
        </main>
        <footer>
          <app-comment-form
            v-if="canAddComment"
            @created="createCommentHandler"
          />
          <div v-if="true" class="comments">
            <app-comment
              v-for="comment in 4"
              :key="comment"
              :comment="comment.toString()"
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
  data() {
    return {
      canAddComment: true,
    };
  },
  methods: {
    createCommentHandler() {
      this.canAddComment = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin: 0 auto;
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

.post-content {
  margin-bottom: 2rem;
}
</style>
