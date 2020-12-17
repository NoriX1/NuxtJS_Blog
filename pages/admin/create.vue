<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <h1 class="mb2">Создать новый пост</h1>
    <el-form-item label="Введите заголовок поста" prop="title">
      <el-input v-model="controls.title" />
    </el-form-item>
    <el-form-item label="Текст в формате .md или .html" prop="text">
      <el-input
        v-model="controls.text"
        type="textarea"
        resize="none"
        :rows="10"
      />
    </el-form-item>
    <el-button class="mb" type="success" plain @click="previewDialog = true"
      >Предпросмотр</el-button
    >
    <el-dialog title="Предпросмотр" :visible.sync="previewDialog">
      <!-- Из-за того, что key будет меняться, будет происходить force ререндер -->
      <div :key="controls.text">
        <!-- eslint-disable-next-line prettier/prettier -->
        <vue-markdown>{{ controls.text }}</vue-markdown>
      </div>
    </el-dialog>
    <el-upload
      ref="upload"
      class="mb"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleUploadChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Перетащите картинку <em>или нажмите сюда</em>
      </div>
      <div slot="tip" class="el-upload__tip">файлы с расширением jpg/png</div>
    </el-upload>
    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading" round
        >Создать пост</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  data() {
    return {
      image: null,
      loading: false,
      previewDialog: false,
      controls: {
        title: '',
        text: '',
      },
      rules: {
        text: [
          {
            required: true,
            message: 'Текст не должен быть пустым',
            trigger: 'blur',
          },
        ],
        title: [
          {
            required: true,
            message: 'Заголовок не может быть пустым',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    handleUploadChange(file, fileList) {
      this.image = file.raw;
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.image) {
          this.loading = true;

          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image,
          };

          try {
            await this.$store.dispatch('post/create', formData);
            this.controls.text = '';
            this.controls.title = '';
            this.image = null;
            this.$refs.upload.clearFiles();
            this.$message.success('Пост успешно создан');
          } catch (e) {
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning(
            'Что-то не так, возможно, вы не добавили картинку.'
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 600px;
}
</style>
