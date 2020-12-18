<template>
  <div>
    <h1>Аналитика по постам</h1>
    <app-analytics
      title="Количество просмотров"
      :labels="views.labels"
      :data="views.data"
    />
    <app-analytics
      title="Количество комментариев"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>

<script>
import AppAnalytics from '@/components/admin/Analytics';
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  components: { AppAnalytics },
  async asyncData({ store }) {
    const { views, comments } = await store.dispatch('post/getAnalytics');
    return { views, comments };
  },
  head: {
    title: `Аналитика | ${process.env.appName}`,
  },
};
</script>
