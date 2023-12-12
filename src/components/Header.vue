<template>
    <div class="header-container">
        <div class="container">
            <div class="header">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
                            <strong>Контакты</strong>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/apartment" class="nav-link" :class="{ 'active': $route.path === '/apartment' }">
                            <strong>Квартиры</strong>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/house" class="nav-link" :class="{ 'active': $route.path === '/house' }">
                            <strong>Дома</strong>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/street" class="nav-link" :class="{ 'active': $route.path === '/street' }">
                            <strong>Улицы</strong>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/city" class="nav-link" :class="{ 'active': $route.path === '/city' }">
                            <strong>Города</strong>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/phonebook" class="nav-link" :class="{ 'active': $route.path === '/phonebook' }">
                            <strong>Навигация</strong>
                        </router-link>
                    </li>
                </ul>

                <div class="auth-container">
                    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#loginModal">
                        Войти
                    </button>
                    <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#registrationModal">
                        Регистрация
                    </button>
                </div>

                <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="loginModalLabel">Вход</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="login">
                                    <div class="mb-3">
                                        <input type="email" v-model="loginData.email" class="form-control"
                                            id="recipient-name" placeholder="Email" required>
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" v-model="loginData.password" class="form-control"
                                            id="recipient-name" placeholder="Пароль" required>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="login">Войти</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="registrationModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="registrationModalLabel">Регистрация</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="register">
                                    <div class="mb-3">
                                        <input type="text" v-model="registerData.username" class="form-control"
                                            id="recipient-name" placeholder="Имя пользователя" required>
                                    </div>
                                    <div class="mb-3">
                                        <input type="email" v-model="registerData.email" class="form-control"
                                            id="recipient-name" placeholder="Email" required>
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" v-model="registerData.password" class="form-control"
                                            id="recipient-name" placeholder="Пароль" required>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success"
                                    data-bs-dismiss="modal">Зарегистрироваться</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            loginData: {
                email: '',
                password: '',
            },
            registerData: {
                username: '',
                email: '',
                password: '',
            },
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('https://localhost:5001/token', this.loginData);
                // Обработка успешного входа
                console.log('Успешный вход:', response.data);

                // Добавим вывод информации о роли пользователя
                if (response.data && response.data.username) {
                    const role = response.data.role || 'user'; // Если роль не указана, считаем, что это пользователь
                    console.log('Роль пользователя:', role);
                }
            } catch (error) {
                // Обработка ошибок
                console.error('Ошибка входа:', error);
            }
        },
        async register() {
            try {
                const response = await axios.post('ссылка на ваш API для регистрации', this.registerData);
                // Обработка успешной регистрации
                console.log(response.data);
            } catch (error) {
                // Обработка ошибок
                console.error('Ошибка регистрации:', error);
            }
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>

<style scoped>
.auth-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    margin: 3px;
}

.header-container {
    width: 100vw;
    background-color: var(--bs-primary);
}

.container {
    height: 73px;
    display: flex;
    align-items: flex-end;
}

.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.nav-tabs .nav-link {
    background-color: var(--bs-secondary-bg);
    border: 2px solid var(--bs-primary);
    border-bottom: 3px solid var(--bs-primary);
}

.nav-tabs:hover .nav-link:hover {
    background-color: var(--secondary-color);
}

.nav-tabs .nav-link.active {
    background-color: var(--gray-color);
    color: #2c3e50;
    border-bottom: 3px solid var(--gray-color);
}

.nav-tabs:hover .nav-link.active:hover {
    background-color: var(--gray-color);
}

#phone {
    color: var(--bs-body-color);
}

#book {
    color: var(--gray-color);
}

#dote {
    color: var(--bs-body-color);
}
</style>