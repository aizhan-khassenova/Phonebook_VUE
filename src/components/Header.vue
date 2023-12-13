<template>
    <div>
        <Alert @alert="showAlert" :alert-message="alertMessage" :alert-type="alertType"></Alert>

        <div class="header-container">
            <div class="container">
                <div class="header">
                    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 link-body-emphasis text-decoration-none"
                        id="a-title">
                        <h3><strong id="phone">Телефoнный</strong></h3>
                        <h3><strong id="book">Справ</strong></h3>
                        <h5><i class="bi bi-person-circle" id="book"></i></h5>
                        <h3><strong id="book">чник</strong></h3>
                        <h3><strong id="dote">.</strong></h3>
                    </a>

                    <div class="auth-container">
                        <div v-if="isLoggedIn" class="user-info">
                            <h6>{{ loginData.username }}</h6>
                        </div>
                        <button v-if="isLoggedIn" type="button" class="btn btn-outline-light" @click="logout">
                            Выйти
                        </button>
                        <button v-if="!isLoggedIn" type="button" class="btn btn-outline-light" data-bs-toggle="modal"
                            data-bs-target="#loginModal">
                            Войти
                        </button>
                        <button v-if="!isLoggedIn" type="button" class="btn btn-light" data-bs-toggle="modal"
                            data-bs-target="#registrationModal">
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="header">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link"
                                :class="{ 'active': $route.path === '/' }"><strong>Контакты</strong></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/apartment" class="nav-link"
                                :class="{ 'active': $route.path === '/apartment' }"><strong>Квартиры</strong></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/house" class="nav-link"
                                :class="{ 'active': $route.path === '/house' }"><strong>Дома</strong></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/street" class="nav-link"
                                :class="{ 'active': $route.path === '/street' }"><strong>Улицы</strong></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/city" class="nav-link"
                                :class="{ 'active': $route.path === '/city' }"><strong>Города</strong></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/phonebook" class="nav-link"
                                :class="{ 'active': $route.path === '/phonebook' }"><strong>Навигация</strong></router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="loginModalLabel">Вход</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="login">
                                <div class="mb-3">
                                    <input type="email" v-model="loginData.username" class="form-control"
                                        id="recipient-name" placeholder="Email" required>
                                </div>
                                <div class="mb-3">
                                    <input type="password" v-model="loginData.password" class="form-control"
                                        id="recipient-name" placeholder="Пароль" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="login">Войти</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="modal fade" id="registrationModal" tabindex="-1" aria-labelledby="exampleModalLabel"
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
                </div> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { apiBaseUrl } from '@/scripts/urls.js';
import Alert from '../components/Alert.vue';

export default {
    data() {
        return {
            loginData: {
                username: '',
                password: '',
            },
            alertMessage: null,
            alertType: null,
            isLoggedIn: false,
            userEmail: null,
        };
    },
    components: {
        Alert,
    },
    methods: {
        showAlert(message, type) {
            this.alertMessage = message;
            this.alertType = type;
        },
        async login() {
            try {
                const response = await axios.post(`${apiBaseUrl}/api/auth/login`, this.loginData);
                console.log(response.data.message);
                this.isLoggedIn = true;
                const loginButton = document.querySelector('.btn-outline-light');
                if (loginButton) {
                    loginButton.innerText = 'Выйти';
                }
                this.alertMessage = 'Вы вошли в аккаунт';
                this.showAlert(this.alertMessage, 'success');
            } catch (error) {
                console.error(error.response.data.message);
                this.alertMessage = 'Неверный логин или пароль';
                this.showAlert(this.alertMessage, 'danger');
            }
        },
        async logout() {
            try {
                // You need to send a request to your server to perform the logout
                const response = await axios.post(`${apiBaseUrl}/api/auth/logout`);
                console.log(response.data.message);

                // Update UI and state after successful logout
                this.isLoggedIn = false;
                const loginButton = document.querySelector('.btn-outline-light');
                if (loginButton) {
                    loginButton.innerText = 'Войти';
                }

                this.alertMessage = 'Вы вышли из аккаунта';
                this.showAlert(this.alertMessage, 'success');
            } catch (error) {
                console.error(error.response.data.message);
                this.showAlert(error.response.data, 'danger');
            }
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>

<style scoped>
.user-info {
    color: white;
}

.auth-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    margin-left: 12px;
}

.header-container {
    width: 100vw;
    background-color: var(--bs-primary);
}

.container {
    height: 50px;
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