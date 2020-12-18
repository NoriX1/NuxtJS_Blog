<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <h1>Создать пользователя</h1>
    <el-form-item label="Логин" prop="login">
      <el-input v-model.trim="controls.login" />
    </el-form-item>
    <div class="mb2">
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="controls.password" type="password" />
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading" round
        >Создать</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      loading: false,
      controls: {
        login: '',
        password: '',
      },
      rules: {
        login: [
          {
            required: true,
            message: 'Введите логин',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Введите пароль',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'Пароль должен быть не менее 6 символов',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    const { message } = this.$route.query;

    switch (message) {
      case 'login':
        this.$message.info('Необходимо пройти авторизацию');
        break;
      case 'logout':
        this.$message.success('Вы успешно вышли из системы');
        break;
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;

          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password,
            };

            await this.$store.dispatch('auth/createUser', formData);
            this.$message.success('Пользователь успешно добавлен');
            this.controls.login = '';
            this.controls.password = '';
            this.loading = false;
          } catch (e) {
            this.loading = false;
          }
        }
      });
    },
  },
  head: {
    title: `Создать пользователя | ${process.env.appName}`,
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 600px;
}
</style>
