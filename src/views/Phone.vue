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
                                <strong>Контакты</strong>
                            </h1>

                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                                    data-bs-target="#myModal" @click="fetchCities" title="Добавить контакт">
                                    <strong>+</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" id="table_container" v-if="data">
                    <div class="col-12" v-for="(city, index) in data" :key="index">
                        <div v-for="(street, index) in city.streets" :key="index">
                            <table v-for="(house, index) in street.houses" :key="index">
                                <tbody v-for="(apartment, index) in house.apartments" :key="index">
                                    <tr v-for="(phone, index) in apartment.phones" :key="index">
                                        <td v-if="phone.owner_Name !== null">
                                            <div id="first_column_container">
                                                <div id="sort_name_container">
                                                    <h6 v-if="phone.owner_Name" id="sort_icon">
                                                        <strong>{{ phone.owner_Name.charAt(0) }}</strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>{{ phone.owner_Name }}</strong>
                                                    </h4>
                                                </div>
                                            </div>

                                            <div id="second_row_container">
                                                <i class="bi bi-geo-alt-fill" id="i-geo"></i>

                                                <h6>
                                                    <strong>Россия, {{ city.city_Name }}, {{ street.street_Name }}, {{
                                                        house.house_Number }}, {{ apartment.apartment_Number }}</strong>
                                                </h6>
                                            </div>
                                        </td>

                                        <td v-if="phone.owner_Name !== null">
                                            <div id="first_row_container">
                                                <div class="btn-group dropstart">
                                                    <button class="btn btn-primary dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false" id="btn-menu"
                                                        title="Редактировать контакт">
                                                        <i class="bi bi-three-dots-vertical" id="i-menu"></i>
                                                    </button>

                                                    <ul class="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-update" id="dropdown-upd"
                                                                @click="prepareId(phone.phone_ID)" href="#">
                                                                <i class="bi bi-pen-fill" id="i-dropdown"></i>

                                                                Обновить контакт
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <hr class="dropdown-divider">
                                                        </li>

                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-delete" id="dropdown-del"
                                                                @click="prepareId(phone.phone_ID)" href="#">
                                                                <i class="bi bi-trash-fill" id="i-dropdown"></i>

                                                                Удалить контакт
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <ul id="no-bullets-list">
                                                <div id="second_column_container">
                                                    <h6>
                                                        <i class="bi bi-telephone-fill" id="i-list" v-if="phone"></i>
                                                    </h6>

                                                    <h6>
                                                        <strong>{{ phone.phone_Number }}</strong>
                                                    </h6>
                                                </div>
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
                            Добавление контакта
                        </h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="createPhone">
                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">
                                    Имя:
                                </label>

                                <input v-model="newOwnerName" type="text" @keydown.enter.prevent
                                    :class="{ 'form-control': true, 'is-invalid': !newOwnerName, 'is-valid': newOwnerName }"
                                    id="message-text" autocomplete="off"
                                    :title="newOwnerName ? 'Все хорошо!' : 'Заполните это поле.'" placeholder="Введите имя">
                            </div>

                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">
                                    Телефон:
                                </label>

                                <input v-model="newPhoneName" type="text" @input="validateInput" @keydown.enter.prevent
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

                                        <option
                                            v-for="city in cities.filter(city => city.streets.some(street => street.houses.some(house => house.apartments[0].apartment_Number !== 0)))"
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
                                        @change="loadHousesForStreet"
                                        :class="{ 'is-invalid': !selectedStreet, 'is-valid': selectedStreet }"
                                        :title="!selectedCity ? 'Сначала выберите город.' : (selectedStreet ? 'Все хорошо!' : 'Выберите один из пунктов списка.')"
                                        :disabled="!selectedCity">

                                        <option selected disabled :value="null">
                                            Выберите...
                                        </option>

                                        <option
                                            v-for="street in filteredStreets.filter(street => street.houses.some(house => house.apartments[0].apartment_Number !== 0))"
                                            :key="street.house_ID" :value="street.street_ID">
                                            {{ street.street_Name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3" id="val-cont">
                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="col-form-label">
                                        Дом:
                                    </label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedHouse"
                                        @change="loadApartmentsForHouse"
                                        :class="{ 'is-invalid': !selectedHouse, 'is-valid': selectedHouse }"
                                        :title="!selectedStreet ? 'Сначала выберите улицу.' : (selectedHouse ? 'Все хорошо!' : 'Выберите один из пунктов списка.')"
                                        :disabled="!selectedStreet">

                                        <option selected disabled :value="null">
                                            Выберите...
                                        </option>

                                        <option
                                            v-for="house in filteredHouses.filter(house => house.apartments[0].apartment_Number !== 0)"
                                            :key="house.house_ID" :value="house.house_ID">
                                            {{ house.house_Number }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="col-form-label">
                                        Квартира:
                                    </label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedApartment"
                                        :class="{ 'is-invalid': !selectedApartment, 'is-valid': selectedApartment }"
                                        :title="!selectedHouse ? 'Сначала выберите дом.' : (selectedApartment ? 'Все хорошо!' : 'Выберите один из пунктов списка.')"
                                        :disabled="!selectedHouse">

                                        <option selected disabled :value="null">
                                            Выберите...
                                        </option>

                                        <option v-for="apartment in filteredApartments" :key="apartment.apartment_ID"
                                            :value="apartment.apartment_ID">
                                            {{ apartment.apartment_Number }}
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

                        <div :title="!selectedApartment || !newOwnerName || !newPhoneName ? 'Заполните все поля.' : ''">
                            <button type="submit" class="btn btn-primary" @click="createPhone"
                                :disabled="!selectedApartment || !newOwnerName || !newPhoneName">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalUpdate @item-updated="onPhoneChanged" :itemId="selectedPhoneId" title="Обновление контакта"
            inputLabelPhone="Телефон:" inputLabel="Имя:" apiEndpoint="phone" name="owner_Name" namePhone="phone_Number"
            inputplaceholder="Введите имя" inputplaceholderPhone="Введите номер" alertMessage="Контакт обновлен">
        </ModalUpdate>

        <ModalDelete @item-deleted="onPhoneChanged" :itemId="selectedPhoneId" title="Удалить контакт?"
            inputLabel="Удаление этого контакта также приведет к удалению его данных." apiEndpoint="phone"
            name="phone_Number" inputplaceholder="Введите название" alertMessage="Контакт удален"></ModalDelete>
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
            newPhoneName: '',
            newOwnerName: '',
            selectedPhoneId: null,

            alertMessage: null,
            alertType: null,
            loading: true,

            cities: [],
            cityId: null,
            selectedCity: null,

            streets: [],
            streetId: null,
            selectedStreet: null,
            filteredStreets: [],

            houses: [],
            houseId: null,
            selectedHouse: null,
            filteredHouses: [],

            apartments: [],
            apartmentId: null,
            selectedApartment: null,
            filteredApartments: [],
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

        prepareId(phoneId) {
            this.selectedPhoneId = phoneId;
            console.log(phoneId)
        },

        onPhoneChanged(message, type) {
            this.showAlert(message, type);
            this.fetchData();
        },

        cancel() {
            this.newPhoneName = '';
            this.newOwnerName = '';
            this.selectedCity = null;
            this.selectedStreet = null;
            this.selectedHouse = null;
            this.selectedApartment = null;
            this.isInputValid = false;
        },

        validateInput() {
            this.isInputValid = /^[\d\s+]+$/.test(this.newPhoneName);
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

        loadStreetsForCity() {
            if (this.selectedCity) {
                const cityId = this.selectedCity;

                axios.get('https://localhost:5001/api/phonebook/listByCity')
                    .then(response => {
                        console.log("Все улицы:", response.data);
                        const streetsForSelectedCity = response.data.filter(city => city.city_ID === cityId);
                        console.log("Выбранные улицы:", streetsForSelectedCity[0].streets);
                        this.filteredStreets = streetsForSelectedCity[0].streets;
                        this.selectedStreet = null;
                        this.selectedHouse = null;
                        this.selectedApartment = null;
                    })

                    .catch(error => {
                        console.error('Ошибка при выполнении GET запроса для получения улиц:', error);
                    });
            } else {
                this.filteredStreets = [];
            }
        },

        loadHousesForStreet() {
            if (this.selectedStreet) {
                const selectedStreetId = this.selectedStreet;
                const selectedStreet = this.filteredStreets.find(street => street.street_ID === selectedStreetId);

                if (selectedStreet) {
                    this.filteredHouses = selectedStreet.houses;
                } else {
                    this.filteredHouses = [];
                }

                this.selectedHouse = null;
                this.selectedApartment = null;
            } else {
                this.filteredHouses = [];
            }
        },

        loadApartmentsForHouse() {
            if (this.selectedHouse) {
                const selectedHouseId = this.selectedHouse;
                const selectedHouse = this.filteredHouses.find(house => house.house_ID === selectedHouseId);

                if (selectedHouse) {
                    this.filteredApartments = selectedHouse.apartments;
                } else {
                    this.filteredApartments = [];
                }

                this.selectedApartment = null;
            } else {
                this.filteredApartments = [];
            }
        },

        fetchCities() {
            axios.get('https://localhost:5001/api/phonebook/listByCity')
                .then(response => {
                    this.cities = response.data;
                    console.log(this.cities);
                })
                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса для получения городов:', error);
                });
        },

        createPhone() {
            this.alertMessage = null;

            if (!this.isInputValid) {
                this.alertMessage = 'Номер телефона должен содержать только цифры.';
                this.showAlert(this.alertMessage, 'danger');
                return;
            }

            const phoneData = {
                phone_Number: this.newPhoneName,
                owner_Name: this.newOwnerName,
            };

            const apartmentIdData = {
                Apartment_ID: this.selectedApartment,
            };

            console.log(apartmentIdData);

            axios.post(`https://localhost:5001/api/phone/${apartmentIdData.Apartment_ID}/`, phoneData)
                .then(response => {
                    console.log(response.data);
                    this.data.push(response.data);
                    this.newPhoneName = '';
                    this.newOwnerName = '';
                    this.selectedStreet = null;
                    this.selectedCity = null;
                    this.selectedHouse = null;
                    this.selectedApartment = null;
                    this.isInputValid = false;
                    this.fetchData();
                    this.alertMessage = 'Контакт добавлен';
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