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
                            <h1 class="text-start text-primary"><strong>Контакты</strong></h1>

                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                                    data-bs-target="#myModal" title="Добавить контакт"><strong>+</strong></button>
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
                                                        <strong>
                                                            {{ phone.owner_Name.charAt(0) }}
                                                        </strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>
                                                            {{ phone.owner_Name }}
                                                        </strong>
                                                    </h4>
                                                </div>


                                            </div>
                                            <div id="second_row_container">
                                                <i class="bi bi-geo-alt-fill" id="i-geo"></i>
                                                <h6><strong>Россия, {{ city.city_Name }}, {{ street.street_Name }}, {{ house.house_Number }}, {{ apartment.apartment_Number }}</strong>
                                                </h6>
                                            </div>
                                        </td>

                                        <td v-if="phone.owner_Name !== null">
                                            <!-- <div id="bullet_number_container"> -->
                                            <div id="first_row_container">
                                                <div class="btn-group dropend">
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
                                                        <strong>
                                                            {{ phone.phone_Number }}
                                                        </strong>
                                                    </h6>

                                                </div>
                                            </ul>



                                            <!-- </div> -->
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Добавление контакта</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="createStreet">


                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">Имя:</label>

                                <input v-model="newOwnerName" type="text"
                                    :class="{ 'form-control': true, 'is-invalid': !newOwnerName, 'is-valid': newOwnerName }"
                                    id="message-text" autocomplete="off"
                                    :title="newOwnerName ? 'Все хорошо!' : 'Заполните это поле.'"
                                    placeholder="Введите имя">
                            </div>

                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">Телефон:</label>

                                <input v-model="newPhoneName" type="text"
                                    :class="{ 'form-control': true, 'is-invalid': !newPhoneName, 'is-valid': newPhoneName }"
                                    id="message-text" autocomplete="off"
                                    :title="newPhoneName ? 'Все хорошо!' : 'Заполните это поле.'"
                                    placeholder="Введите номер">
                            </div>

                            <div class="mb-3" id="val-cont">
                                <!-- <div class="col-md-5" id="val-item"> -->
                                    <label for="validationServer04" class="col-form-label">Квартира:</label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedCity"
                                        :class="{ 'is-invalid': !selectedCity, 'is-valid': selectedCity }"
                                        :title="selectedCity ? 'Все хорошо!' : 'Выберите один из пунктов списка.'">

                                        <option selected disabled :value="null">Выберите...</option>

                                        <option v-for="city in cities" :key="city.city_ID" :value="city.city_ID">{{
                                            city.city_Name }}</option>
                                    </select>
                                <!-- </div> -->
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">Отмена</button>

                        <div :title="!selectedCity || !newOwnerName || !newPhoneName ? 'Заполните все поля.' : ''">

                            <button type="submit" class="btn btn-primary" @click="createStreet"
                                :disabled="!selectedCity || !newOwnerName || !newPhoneName">Добавить</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <ModalUpdate @item-updated="onPhoneChanged" :itemId="selectedPhoneId" title="Обновление контакта" inputLabelOwner="Имя:"
            inputLabel="Телефон:" apiEndpoint="phone" name="phone_Number" nameOwner="owner_Name" inputplaceholder="Введите номер"
            inputplaceholderOwner="Введите имя" alertMessage="Контакт обновлен"></ModalUpdate>

        <ModalDelete @item-deleted="onPhoneChanged" :itemId="selectedPhoneId" title="Удалить контакт?"
            inputLabel="Удаление этого контакта также приведет к удалению его данных." apiEndpoint="phone"
            name="phone_Number" inputplaceholder="Введите название" alertMessage="Контакт удален"></ModalDelete>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';
import Header from '@/components/Header.vue';
// import Title from '@/components/Title.vue';
import Footer from '@/components/Footer.vue';
import ModalUpdate from '@/components/ModalUpdate.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import Alert from '@/components/Alert.vue';
import Loader from '@/components/Loader.vue';


export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newPhoneName: '', // Добавьте новое поле для хранения названия нового города
            newOwnerName: '',
            selectedPhoneId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
            alertType: null,
            loading: true,
        };
    },

    components: {
        Header,
        // Title,
        Footer,
        // ModalCreate,
        ModalUpdate,
        ModalDelete,
        Alert,
        Loader
    },

    mounted() {
        // Вызываем fetchData при загрузке компонента
        setTimeout(() => {
      this.fetchData();
    }, 100);
    },

    methods: {
        showAlert(message, type) {
            this.alertMessage = message;
            this.alertType = type;
            // console.log("city.vue show alert", message, type);
        },
        fetchData() {
            axios.get('https://localhost:5001/api/phonebook/listByCity') // Выполняем GET-запрос к серверу
                .then(response => {
                    this.data = response.data;
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error); // Выводим ошибку в случае неудачи
                })
                .finally(() => {
                    this.loading = false; // Завершаем загрузку
                });
        },



        prepareId(phoneId) {
            this.selectedPhoneId = phoneId;
            console.log(phoneId)
        },

        onPhoneChanged(message, type) {
            this.showAlert(message, type); // Вызываем showAlert с переданным типом уведомления
            this.fetchData(); // Запрашиваем актуальные данные с сервера
        },

        cancel() {
            this.newPhoneName = ''; // Сброс значения поля
            this.newOwnerName = ''; // Сброс значения поля
            this.selectedCity = null; // Сброс значения поля
        },
    }
}
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/style.css"></style>