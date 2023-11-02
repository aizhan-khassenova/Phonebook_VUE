<template>
    <div>
        <Alert @alert="showAlert" :alert-message="alertMessage" :alert-type="alertType"></Alert>
        <Header></Header>
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="col-3" id="title_container">
                            <h1 class="text-start text-primary"><strong>Квартиры</strong></h1>

                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                                    data-bs-target="#myModal" title="Добавить квартиру"><strong>+</strong></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" id="table_container">
                    <div class="col-12">
                        <div v-if="data">
                            <table>
                                <tbody>
                                    <tr v-for="(apartment, index) in data" :key="index">
                                        <td>
                                            <div id="first_column_container">
                                                <div id="sort_name_container">
                                                    <h6 v-if="apartment.apartment_Number" id="sort_icon">
                                                        <strong>
                                                            {{ apartment.apartment_Number }}
                                                        </strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>
                                                            {{ apartment.apartment_Number }}
                                                        </strong>
                                                    </h4>
                                                </div>


                                            </div>

                                            <div id="second_row_container">
                                                <i class="bi bi-geo-alt-fill" id="i-geo"></i>
                                                <h6><strong>Россия, Санкт-Петербург, Камергенский переулок, 11</strong></h6>
                                            </div>
                                        </td>

                                        <td>
                                            <div id="first_row_container">
                                                <div class="btn-group dropend">
                                                    <button class="btn btn-primary dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false" id="btn-menu" title="Редактировать квартиру">
                                                        <i class="bi bi-three-dots-vertical" id="i-menu"></i>
                                                    </button>

                                                    <ul class="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                                        <li title="Квартиру нельзя обновить.">
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-update" id="dropdown-upd"
                                                                @click="prepareId(house.house_ID)" href="#">
                                                                <i class="bi bi-pen-fill" id="i-dropdown"></i>
                                                                Обновить квартиру
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <hr class="dropdown-divider">
                                                        </li>

                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-delete" id="dropdown-del"
                                                                @click="prepareId(apartment.apartment_ID)" href="#">
                                                                <i class="bi bi-trash-fill" id="i-dropdown"></i>
                                                                Удалить квартиру
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <ul id="no-bullets-list">
                                                <li v-for="(phone, oIndex) in apartment.phones" :key="oIndex">
                                                    <div id="second_column_container">
                                                        <h6>
                                                            <i class="bi bi-person-fill" id="i-list" v-if="phone"></i>
                                                        </h6>

                                                        <h6>
                                                            <strong>
                                                                {{ phone ? phone.owner_Name : 'Нет контактов' }}
                                                            </strong>
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

        <Footer></Footer>

        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Добавление квартиры</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="createStreet">


                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">Квартира:</label>

                                <input v-model="newStreetName" type="text"
                                    :class="{ 'form-control': true, 'is-invalid': !newStreetName, 'is-valid': newStreetName }"
                                    id="message-text" autocomplete="off"
                                    :title="newStreetName ? 'Все хорошо!' : 'Заполните это поле.'"
                                    placeholder="Введите номер">
                            </div>

                            <div class="mb-3" id="val-cont">
                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="col-form-label">Город:</label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedCity"
                                        :class="{ 'is-invalid': !selectedCity, 'is-valid': selectedCity }"
                                        :title="selectedCity ? 'Все хорошо!' : 'Выберите один из пунктов списка.'">

                                        <option selected disabled :value="null">Выберите...</option>

                                        <option v-for="city in cities" :key="city.city_ID" :value="city.city_ID">{{
                                            city.city_Name }}</option>
                                    </select>
                                </div>

                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="col-form-label">Улица:</label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedCity"
                                        :class="{ 'is-invalid': !selectedCity, 'is-valid': selectedCity }"
                                        :title="selectedCity ? 'Все хорошо!' : 'Выберите один из пунктов списка.'">

                                        <option selected disabled :value="null">Выберите...</option>

                                        <option v-for="city in cities" :key="city.city_ID" :value="city.city_ID">{{
                                            city.city_Name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3" id="val-cont">
                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="col-form-label">Дом:</label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedCity"
                                        :class="{ 'is-invalid': !selectedCity, 'is-valid': selectedCity }"
                                        :title="selectedCity ? 'Все хорошо!' : 'Выберите один из пунктов списка.'">

                                        <option selected disabled :value="null">Выберите...</option>

                                        <option v-for="city in cities" :key="city.city_ID" :value="city.city_ID">{{
                                            city.city_Name }}</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>

                        <div :title="!selectedCity || !newStreetName ? 'Заполните все поля.' : ''">
                        <button type="submit" class="btn btn-primary" @click="createStreet"
                            :disabled="!selectedCity || !newStreetName">Добавить</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalDelete @item-deleted="onApartmentChanged" :itemId="selectedApartmentId" title="Удалить квартиру?"
            inputLabel="Удаление этой квартиры также приведет к удалению ее данных." apiEndpoint="apartment"
            name="apartment_Number" inputplaceholder="Введите название" alertMessage="Квартира удалена"></ModalDelete>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';
import Header from '@/components/Header.vue';
// import Title from '@/components/Title.vue';
import Footer from '@/components/Footer.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import Alert from '@/components/Alert.vue';


export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newApartmentName: '', // Добавьте новое поле для хранения названия нового города
            selectedApartmentId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
            alertType: null,
        };
    },

    components: {
        Header,
        // Title,
        Footer,
        // ModalCreate,
        ModalDelete,
        Alert
    },

    mounted() {
        // Вызываем fetchData при загрузке компонента
        this.fetchData();
    },

    methods: {
        showAlert(message, type) {
            this.alertMessage = message;
            this.alertType = type;
            // console.log("city.vue show alert", message, type);
        },
        fetchData() {
            axios.get('https://localhost:5001/api/apartment') // Выполняем GET-запрос к серверу
                .then(response => {
                    // const sortedData = response.data.map(apartment => {
                    //     apartment.phones = apartment.phones.sort((a, b) => {
                    //         const phoneNumberA = parseInt(a.owner_Name, 10);
                    //         const phoneNumberB = parseInt(b.owner_Name, 10);
                    //         return phoneNumberA - phoneNumberB;
                    //     });
                    //     return apartment;
                    // });

                    // this.data = sortedData.sort((a, b) => a.apartment_Number.localeCompare(b.apartment_Number));
                    this.data = response.data;
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error); // Выводим ошибку в случае неудачи
                })
        },


        prepareId(apartmentId) {
            this.selectedApartmentId = apartmentId;
            console.log(apartmentId)
        },

        onApartmentChanged(message, type) {
            this.showAlert(message, type); // Вызываем showAlert с переданным типом уведомления
            this.fetchData(); // Запрашиваем актуальные данные с сервера
        },
    }
}
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/city.css"></style>
<style src="../styles/updateHouseApartment.css" scoped></style>