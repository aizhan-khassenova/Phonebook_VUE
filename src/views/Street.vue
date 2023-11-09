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
                                <strong>Улицы</strong>
                            </h1>

                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                                    data-bs-target="#myModal" @click="fetchCities" title="Добавить улицу">
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
                                <tbody v-for="(city, index) in data" :key="index">
                                    <tr v-for="(street, index) in city.streets" :key="index">
                                        <td v-if="street.street_Name !== null">
                                            <div id="first_column_container">
                                                <div id="sort_name_container">
                                                    <h6 v-if="street.street_Name" id="sort_icon">
                                                        <strong>{{ street.street_Name.charAt(0) }}</strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>{{ street.street_Name }}</strong>
                                                    </h4>
                                                </div>
                                            </div>

                                            <div id="second_row_container">
                                                <i class="bi bi-geo-alt-fill" id="i-geo"></i>

                                                <h6>
                                                    <strong>Россия, {{ city.city_Name }}</strong>
                                                </h6>
                                            </div>
                                        </td>

                                        <td v-if="street.street_Name !== null">
                                            <div id="first_row_container">
                                                <div class="btn-group dropstart">
                                                    <button class="btn btn-primary dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false" id="btn-menu"
                                                        title="Редактировать улицу">
                                                        <i class="bi bi-three-dots-vertical" id="i-menu"></i>
                                                    </button>

                                                    <ul class="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-update" id="dropdown-upd"
                                                                @click="prepareId(street.street_ID)" href="#">
                                                                <i class="bi bi-pen-fill" id="i-dropdown"></i>

                                                                Обновить улицу
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <hr class="dropdown-divider">
                                                        </li>

                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-delete" id="dropdown-del"
                                                                @click="prepareId(street.street_ID)" href="#">
                                                                <i class="bi bi-trash-fill" id="i-dropdown"></i>

                                                                Удалить улицу
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <ul id="no-bullets-list">
                                                <li v-for="(house, hIndex) in street.houses" :key="hIndex">
                                                    <div id="second_column_container">
                                                        <h6>
                                                            <i class="bi bi-house-door-fill" id="i-list"
                                                                v-if="house.house_Number"></i>
                                                        </h6>

                                                        <h6>
                                                            <strong>{{ house !== null && house.house_Number !== 0 ?
                                                                house.house_Number : 'Нет домов' }}</strong>
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
                            Добавление улицы
                        </h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="createStreet">
                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">
                                    Улица:
                                </label>

                                <input v-model="newStreetName" type="text" @keydown.enter.prevent
                                    :class="{ 'form-control': true, 'is-invalid': !newStreetName, 'is-valid': newStreetName }"
                                    id="message-text" autocomplete="off"
                                    :title="newStreetName ? 'Все хорошо!' : 'Заполните это поле.'"
                                    placeholder="Введите название">
                            </div>

                            <div class="mb-3" id="val-cont">
                                <div class="mb-3" id="val-item">
                                    <label for="validationServer04" class="col-form-label">
                                        Город:
                                    </label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedCity"
                                        :class="{ 'is-invalid': !selectedCity, 'is-valid': selectedCity }"
                                        :title="selectedCity ? 'Все хорошо!' : 'Выберите один из пунктов списка.'">

                                        <option selected disabled :value="null">
                                            Выберите...
                                        </option>

                                        <option v-for="city in cities" :key="city.city_ID" :value="city.city_ID">
                                            {{ city.city_Name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">
                            Отмена
                        </button>

                        <div :title="!selectedCity || !newStreetName ? 'Заполните все поля.' : ''">
                            <button type="submit" class="btn btn-primary" @click="createStreet"
                                :disabled="!selectedCity || !newStreetName">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalUpdate @item-updated="onStreetChanged" :itemId="selectedStreetId" title="Обновление улицы" inputLabel="Улица:"
            apiEndpoint="street" name="street_Name" inputplaceholder="Введите название" alertMessage="Улица обновлена">
        </ModalUpdate>

        <ModalDelete @item-deleted="onStreetChanged" :itemId="selectedStreetId" title="Удалить улицу?"
            inputLabel="Удаление этой улицы также приведет к удалению ее данных." apiEndpoint="street" name="street_Name"
            inputplaceholder="Введите название" alertMessage="Улица удалена"></ModalDelete>
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
            newStreetName: '',
            selectedStreetId: null,

            alertMessage: null,
            alertType: null,
            loading: true,

            cityId: null,
            cities: [],
            selectedCity: null,
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

        prepareId(streetId) {
            this.selectedStreetId = streetId;
            console.log(streetId)
        },

        onStreetChanged(message, type) {
            this.showAlert(message, type);
            this.fetchData();
        },

        cancel() {
            this.newStreetName = '';
            this.selectedCity = null;
        },

        fetchData() {
            axios.get('https://localhost:5001/api/phonebook/listByCity')
                .then(response => {
                    this.data = response.data;
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error);
                })

                .finally(() => {
                    this.loading = false;
                });
        },

        fetchCities() {
            axios.get('https://localhost:5001/api/city')
                .then(response => {
                    this.cities = response.data;
                    this.cities.sort((a, b) => a.city_Name.localeCompare(b.city_Name));
                    console.log(this.cities);
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса для получения городов:', error);
                });
        },

        createStreet() {
            this.fetchCities();
            this.alertMessage = null;

            const streetData = {
                Street_Name: this.newStreetName,
            };

            const cityIdData = {
                City_ID: this.selectedCity,
            };

            console.log(cityIdData);

            axios.post(`https://localhost:5001/api/street/${cityIdData.City_ID}/`, streetData)
                .then(response => {
                    console.log(response.data);
                    this.newStreetName = '';
                    this.selectedCity = null;
                    this.fetchData();
                    this.alertMessage = 'Улица добавлена';
                    this.showAlert(this.alertMessage, 'success');
                })

                .catch(error => {
                    console.error('Ошибка при выполнении POST запроса:', error);
                    this.alertMessage = 'Улица уже существует';
                    this.showAlert(this.alertMessage, 'danger');
                });

            document.querySelector('[data-bs-dismiss="modal"]').click();
        },
    }
}
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/style.css"></style>