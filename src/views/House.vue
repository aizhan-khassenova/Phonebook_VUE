<template>
    <div>
        <Alert @alert="showAlert" :alert-message="alertMessage" :alert-type="alertType"></Alert>

        <Loader v-if="loading"></Loader>

        <Header></Header>

        <section v-if="!loading">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="col-3" id="title_container">
                            <h1 class="text-start text-primary">
                                <strong>Дома</strong>
                            </h1>

                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                                    data-bs-target="#myModal" @click="fetchCities" title="Добавить дом">
                                    <strong>+</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <nav class="navbar">
                    <div class="container-fluid">
                        <form class="d-flex" role="search">
                            <input class="form-control border border-primary border-2" type="search" placeholder="Поиск"
                                aria-label="Search" @input="updateSearchQuery($event.target.value)" @keydown.enter.prevent>
                        </form>
                    </div>
                </nav>

                <div class="row" id="table_container">
                    <div class="col-12">
                        <div v-if="paginatedHouses.length > 0">
                            <table>
                                <tbody v-for="(house, index) in paginatedHouses" :key="index">
                                    <tr v-if="house.house_Number !== 0">
                                        <td>
                                            <div id="first_column_container">
                                                <div id="sort_name_container">
                                                    <h6 v-if="house.house_Number" id="sort_icon">
                                                        <strong><i class="bi bi-house-door-fill"></i></strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>{{ house.house_Number }}</strong>
                                                    </h4>
                                                </div>
                                            </div>

                                            <div id="second_row_container">
                                                <i class="bi bi-geo-alt-fill" id="i-geo"></i>

                                                <h6>
                                                    <strong>Россия, {{ house.cityName }}, {{ house.streetName }}</strong>
                                                </h6>
                                            </div>
                                        </td>

                                        <td v-if="house.house_Number !== 0">
                                            <div id="first_row_container">
                                                <div class="btn-group dropstart">
                                                    <button class="btn btn-primary dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false" id="btn-menu"
                                                        title="Редактировать дом">
                                                        <i class="bi bi-three-dots-vertical" id="i-menu"></i>
                                                    </button>

                                                    <ul class="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                                        <!-- <li title="Дом нельзя обновить.">
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-update" id="dropdown-upd"
                                                                @click="prepareId(house.house_ID)" href="#">
                                                                <i class="bi bi-pen-fill" id="i-dropdown"></i>

                                                                Обновить дом
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <hr class="dropdown-divider">
                                                        </li> -->

                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-delete" id="dropdown-del"
                                                                @click="prepareId(house.house_ID)" href="#">
                                                                <i class="bi bi-trash-fill" id="i-dropdown"></i>

                                                                Удалить дом
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <ul id="no-bullets-list">
                                                <template v-if="house.apartments && house.apartments.length > 0">
                                                    <li v-for="(apartment, aIndex) in house.apartments" :key="aIndex">
                                                        <div v-if="apartment.apartment_Number !== null && apartment.apartment_Number !== 0" id="second_column_container">
                                                            <h6>
                                                                <i class="bi bi-key-fill" id="i-list"></i>
                                                            </h6>

                                                            <h6>
                                                                <strong>{{ apartment.apartment_Number }}</strong>
                                                            </h6>
                                                        </div>
                                                    </li>

                                                    <li v-if="!house.apartments.some(apartment => apartment.apartment_Number !== null && apartment.apartment_Number !== 0)">
                                                        <div id="second_column_container">
                                                            <h6>
                                                                <strong>Нет квартир</strong>
                                                            </h6>
                                                        </div>
                                                    </li>
                                                </template>

                                                <li v-else>
                                                    <div id="second_column_container">
                                                        <h6>
                                                            <strong>Нет квартир</strong>
                                                        </h6>
                                                    </div>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div v-else>
                            <p>Совпадающих домов не найдено.</p>
                        </div>
                    </div>
                </div>

                <nav aria-label="...">
                    <ul class="pagination">
                        <li v-for="pageNumber in totalPages" :key="pageNumber"
                            :class="{ 'page-item': true, 'active': currentPage === pageNumber }"
                            @click="changePage(pageNumber)">
                            <a class="page-link" href="#">
                                {{ pageNumber }}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>

        <Footer v-if="!loading"></Footer>

        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Добавление дома
                        </h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="createHouse">
                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">
                                    Дом:
                                </label>

                                <input v-model="newHouseName" type="text" @input="validateInput" @keydown.enter.prevent
                                    :class="{ 'form-control': true, 'is-invalid': !isInputValid, 'is-valid': isInputValid }"
                                    id="message-text" autocomplete="off"
                                    :title="isInputValid ? 'Все хорошо!' : 'Заполните это поле.'"
                                    placeholder="Введите номер">
                            </div>

                            <div class="mb-3" id="val-cont">
                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="col-form-label">
                                        Город:
                                    </label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedCity"
                                        @change="loadStreetsForCity"
                                        :class="{ 'is-invalid': !selectedCity, 'is-valid': selectedCity }"
                                        :title="selectedCity ? 'Все хорошо!' : 'Выберите один из пунктов списка.'">

                                        <option selected disabled :value="null">
                                            Выберите...
                                        </option>

                                        <option v-for="city in cities.filter(city => city.streets[0] !== null)"
                                            :key="city.street_ID" :value="city.city_ID">
                                            {{ city.city_Name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="col-form-label">
                                        Улица:
                                    </label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedStreet"
                                        :class="{ 'is-invalid': !selectedStreet, 'is-valid': selectedStreet }"
                                        :title="!selectedCity ? 'Сначала выберите город.' : (selectedStreet ? 'Все хорошо!' : 'Выберите один из пунктов списка.')"
                                        :disabled="!selectedCity">

                                        <option selected disabled :value="null">
                                            Выберите...
                                        </option>

                                        <option v-for="street in filteredStreets" :key="street.street_ID"
                                            :value="street.street_ID">
                                            {{ street.street_Name }}
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

                        <div :title="!selectedStreet || !newHouseName ? 'Заполните все поля.' : ''">
                            <button type="submit" class="btn btn-primary" @click="createHouse"
                                :disabled="!selectedStreet || !newHouseName">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalDelete @item-deleted="onHouseChanged" :itemId="selectedHouseId" title="Удалить дом?"
            inputLabel="Удаление этого дома также приведет к удалению его данных." apiEndpoint="house" name="house_Number"
            inputplaceholder="Введите название" alertMessage="Дом удален"></ModalDelete>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import Alert from '@/components/Alert.vue';
import Loader from '@/components/Loader.vue';

// const apiBaseUrl = 'http://172.17.1.31:80'; // Новая переменная для базового URL API
import { apiBaseUrl } from '@/scripts/urls.js';

export default {
    data() {
        return {
            data: null,
            newHouseName: '',
            selectedHouseId: null,

            alertMessage: null,
            alertType: null,
            loading: true,
            searchQuery: '',

            cities: [],
            cityId: null,
            selectedCity: null,

            streets: [],
            streetId: null,
            selectedStreet: null,
            filteredStreets: [],

            housesData: [],

            currentPage: 1,
            pageSize: 10,
        };
    },

    components: {
        Header,
        Footer,
        ModalDelete,
        Alert,
        Loader
    },

    mounted() {
        setTimeout(() => {
            this.fetchData();
        }, 100);
    },

    computed: {
        filteredHouses() {
            if (this.data) {
                return this.housesData.filter(house => {
                    return house.house_Number.toString().includes(this.searchQuery.toLowerCase());
                });
            } else {
                return [];
            }
        },

        totalPages() {
            return Math.ceil(this.filteredHouses.length / this.pageSize);
        },

        paginatedHouses() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredHouses.slice(start, end);
        },
    },

    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },

        updateSearchQuery(value) {
            this.searchQuery = value;
            this.currentPage = 1;
        },

        showAlert(message, type) {
            this.alertMessage = message;
            this.alertType = type;
        },

        prepareId(houseId) {
            this.selectedHouseId = houseId;
            console.log(houseId)
        },

        onHouseChanged(message, type) {
            this.showAlert(message, type);
            this.fetchData();
        },

        cancel() {
            this.newHouseName = '';
            this.selectedStreet = null;
            this.selectedCity = null;
            this.isInputValid = false;
        },

        validateInput() {
            this.isInputValid = /^\d+$/.test(this.newHouseName);
        },

        fetchData() {
            axios.get(`${apiBaseUrl}/api/phonebook/listByCity`)
                .then(response => {
                    this.data = response.data;
                    this.housesData = []

                    for (const city of this.data) {
                        for (const street of city.streets) {
                            for (const house of street.houses) {
                                Object.assign(house, { cityName: city.city_Name });
                                Object.assign(house, { streetName: street.street_Name });
                                this.housesData.push(house);
                            }
                        }
                    }
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error);
                })

                .finally(() => {
                    this.loading = false;
                });
        },

        loadStreetsForCity() {
            if (this.selectedCity) {
                const cityId = this.selectedCity;

                axios.get(`${apiBaseUrl}/api/phonebook/listByCity`)
                    .then(response => {
                        console.log("Все улицы:", response.data);
                        const streetsForSelectedCity = response.data.filter(city => city.city_ID === cityId);
                        console.log("Выбранные улицы:", streetsForSelectedCity[0].streets);
                        this.filteredStreets = streetsForSelectedCity[0].streets;
                        this.selectedStreet = null;
                    })

                    .catch(error => {
                        console.error('Ошибка при выполнении GET запроса для получения улиц:', error);
                    });
            } else {
                this.filteredStreets = [];
            }
        },

        fetchCities() {
            axios.get(`${apiBaseUrl}/api/city`)
                .then(response => {
                    this.cities = response.data;
                    this.cities.sort((a, b) => a.city_Name.localeCompare(b.city_Name));
                    console.log(this.cities);
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса для получения городов:', error);
                });
        },

        createHouse() {
            this.alertMessage = null;

            if (!this.isInputValid) {
                this.alertMessage = 'Номер дома должен содержать только цифры.';
                this.showAlert(this.alertMessage, 'danger');
                return;
            }

            const houseData = {
                House_Number: this.newHouseName,
            };

            const streetIdData = {
                Street_ID: this.selectedStreet,
            };

            console.log(streetIdData);

            axios.post(`${apiBaseUrl}/api/house/${streetIdData.Street_ID}/`, houseData)
                .then(response => {
                    console.log(response.data);
                    this.data.push(response.data);
                    this.newHouseName = '';
                    this.selectedStreet = null;
                    this.selectedCity = null;
                    this.isInputValid = false;
                    this.fetchData();
                    this.alertMessage = 'Дом добавлен';
                    this.showAlert(this.alertMessage, 'success');
                })

                .catch(error => {
                    console.error('Ошибка при выполнении POST запроса:', error);
                    this.showAlert(error.response.data, 'danger');
                });

            document.querySelector('[data-bs-dismiss="modal"]').click();
        },
    }
}
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/style.css"></style>

<style scoped>
#dropdown-upd {
    pointer-events: none;
    color: var(--bs-secondary-color);
}

#dropdown-upd:hover {
    background-color: initial;
}

#sort_icon {
	margin-right: 35px;
}
</style>