<template>
    <div>
        <Alert @alert="showAlert" :alert-message="alertMessage" :alert-type="alertType"></Alert>

        <Loader v-if="loading"></Loader>

        <Header></Header>

        <section v-if="!loading">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div id="title_container">
                            <h1 class="text-start text-primary">
                                <strong>Города</strong>
                            </h1>

                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                                    data-bs-target="#myModal" title="Добавить город">
                                    <strong>+</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" id="table_container">
                    <div class="col-12">
                        <div v-if="data">
                            <table>
                                <tbody>
                                    <tr v-for="(city, index) in data" :key="index">
                                        <td>
                                            <div id="first_column_container">
                                                <div id="sort_name_container">
                                                    <h6 v-if="city.city_Name" id="sort_icon">
                                                        <strong>{{ city.city_Name.charAt(0) }}</strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>{{ city.city_Name }}</strong>
                                                    </h4>
                                                </div>
                                            </div>

                                            <div id="second_row_container">
                                                <i class="bi bi-geo-alt-fill" id="i-geo"></i>

                                                <h6>
                                                    <strong>Россия</strong>
                                                </h6>
                                            </div>
                                        </td>

                                        <td>
                                            <div id="first_row_container">
                                                <div class="btn-group dropstart">
                                                    <button class="btn btn-primary dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false" id="btn-menu"
                                                        title="Редактировать город">
                                                        <i class="bi bi-three-dots-vertical" id="i-menu"></i>
                                                    </button>

                                                    <ul class="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-update" id="dropdown-upd"
                                                                @click="prepareId(city.city_ID)" href="#">
                                                                <i class="bi bi-pen-fill" id="i-dropdown"></i>

                                                                Обновить город
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <hr class="dropdown-divider">
                                                        </li>

                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-delete" id="dropdown-del"
                                                                @click="prepareId(city.city_ID)" href="#">
                                                                <i class="bi bi-trash-fill" id="i-dropdown"></i>

                                                                Удалить город
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <ul id="no-bullets-list">
                                                <li v-for="(street, sIndex) in city.streets" :key="sIndex">
                                                    <div id="second_column_container">
                                                        <h6>
                                                            <i class="bi bi-signpost-fill" id="i-list" v-if="street"></i>
                                                        </h6>

                                                        <h6>
                                                            <strong>{{ street ? street.street_Name : 'Нет улиц' }}</strong>
                                                        </h6>
                                                    </div>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer v-if="!loading"></Footer>

        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Добавление города
                        </h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="createCity">
                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">
                                    Город:
                                </label>

                                <input v-model="newCityName" type="text" @keydown.enter.prevent
                                    :class="{ 'form-control': true, 'is-invalid': !newCityName, 'is-valid': newCityName }"
                                    id="message-text" autocomplete="off"
                                    :title="!newCityName ? 'Заполните это поле.' : 'Все хорошо!'"
                                    placeholder="Введите название">
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">
                            Отмена
                        </button>

                        <div :title="!newCityName ? 'Заполните все поля.' : ''">
                            <button type="submit" class="btn btn-primary" @click="createCity"
                                :disabled="!newCityName">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalUpdate @item-updated="onCityChanged" :itemId="selectedCityId" title="Обновление города" inputLabel="Город:"
            apiEndpoint="city" name="city_Name" inputplaceholder="Введите название" alertMessage="Город обновлен">
        </ModalUpdate>

        <ModalDelete @item-deleted="onCityChanged" :itemId="selectedCityId" title="Удалить город?"
            inputLabel="Удаление этого города также приведет к удалению его данных." apiEndpoint="city" name="city_Name"
            inputplaceholder="Введите название" alertMessage="Город удален"></ModalDelete>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ModalUpdate from '@/components/ModalUpdate.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import Alert from '@/components/Alert.vue';
import Loader from '@/components/Loader.vue';

export default {
    data() {
        return {
            data: null,
            newCityName: '',
            selectedCityId: null,
            alertMessage: null,
            alertType: null,
            loading: true,
        };
    },

    components: {
        Header,
        Footer,
        ModalUpdate,
        ModalDelete,
        Alert,
        Loader
    },

    mounted() {
        setTimeout(() => {
            this.fetchData();
        }, 100);
    },

    methods: {
        showAlert(message, type) {
            this.alertMessage = message;
            this.alertType = type;
        },

        prepareId(cityId) {
            this.selectedCityId = cityId;
        },

        onCityChanged(message, type) {
            this.showAlert(message, type);
            this.fetchData();
        },

        cancel() {
            this.newCityName = '';
        },

        fetchData() {
            axios.get('https://localhost:5001/api/city')
                .then(response => {
                    const sortedData = response.data.map(city => {
                        city.streets = city.streets.sort((a, b) => a.street_Name.localeCompare(b.street_Name));
                        return city;
                    });

                    this.data = sortedData.sort((a, b) => a.city_Name.localeCompare(b.city_Name));
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error);
                })

                .finally(() => {
                    this.loading = false;
                });
        },

        createCity() {
            const cityData = {
                City_Name: this.newCityName,
            };

            axios.post('https://localhost:5001/api/city', cityData)
                .then(response => {
                    console.log(response.data);
                    this.data.push(response.data);
                    this.newCityName = '';
                    this.fetchData();
                    this.alertMessage = 'Город добавлен';
                    this.showAlert(this.alertMessage, 'success');
                })

                .catch(error => {
                    console.error('Ошибка при выполнении POST запроса:', error);
                    this.showAlert(error.response.data, 'danger');
                });

            document.querySelector('[data-bs-dismiss="modal"]').click();
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/style.css"></style>