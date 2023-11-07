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
                            <h1 class="text-start text-primary"><strong>Дома</strong></h1>

                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                                    data-bs-target="#myModal" @click="fetchChoises"
                                    title="Добавить дом"><strong>+</strong></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" id="table_container">
                    <div class="col-12">
                        <div v-if="data">
                            <table v-for="(city, index) in data" :key="index">
                                <tbody v-for="(street, index) in city.streets" :key="index">
                                    <tr v-for="(house, index) in street.houses" :key="index">
                                        <td v-if="house.house_Number !== 0">
                                            <div id="first_column_container">
                                                <div id="sort_name_container">
                                                    <h6 v-if="house.house_Number" id="sort_icon">
                                                        <strong>
                                                            <!-- {{ house.house_Number }} -->
                                                            <i class="bi bi-house-door-fill"></i>
                                                        </strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>
                                                            {{ house.house_Number }}
                                                        </strong>
                                                    </h4>
                                                </div>


                                            </div>

                                            <div id="second_row_container">
                                                <i class="bi bi-geo-alt-fill" id="i-geo"></i>
                                                <h6><strong>Россия, {{ city.city_Name }}, {{ street.street_Name }}</strong>
                                                </h6>
                                            </div>
                                        </td>

                                        <td v-if="house.house_Number !== 0">
                                            <div id="first_row_container">
                                                <div class="btn-group dropend">
                                                    <button class="btn btn-primary dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false" id="btn-menu"
                                                        title="Редактировать дом">
                                                        <i class="bi bi-three-dots-vertical" id="i-menu"></i>
                                                    </button>

                                                    <ul class="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                                        <li title="Дом нельзя обновить.">
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-update" id="dropdown-upd"
                                                                @click="prepareId(house.house_ID)" href="#">
                                                                <i class="bi bi-pen-fill" id="i-dropdown"></i>
                                                                Обновить дом
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <hr class="dropdown-divider">
                                                        </li>

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
                                                <li v-for="(apartment, aIndex) in house.apartments" :key="aIndex">
                                                    <div id="second_column_container">
                                                        <h6>
                                                            <i class="bi bi-key-fill" id="i-list"
                                                                v-if="apartment.apartment_Number"></i>
                                                        </h6>

                                                        <h6>
                                                            <strong>
                                                                {{ apartment !== null && apartment.apartment_Number !== 0 ?
                                                                    apartment.apartment_Number : 'Нет квартир' }}
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

        <Footer v-if="!loading"></Footer>

        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Добавление дома</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="createHouse">


                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">Дом:</label>

                                <input v-model="newHouseName" type="text"
                                    :class="{ 'form-control': true, 'is-invalid': !newHouseName, 'is-valid': newHouseName }"
                                    id="message-text" autocomplete="off"
                                    :title="newHouseName ? 'Все хорошо!' : 'Заполните это поле.'"
                                    placeholder="Введите номер">
                            </div>

                            <div class="mb-3" id="val-cont">
                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="col-form-label">Улица:</label>

                                    <select class="form-select" id="validationServer04" required v-model="selectedStreet"
                                        :class="{ 'is-invalid': !selectedStreet, 'is-valid': selectedStreet }"
                                        :title="selectedStreet ? 'Все хорошо!' : 'Выберите один из пунктов списка.'">

                                        <option selected disabled :value="null">Выберите...</option>

                                        <option v-for="street in choises" :key="street.street_ID" :value="street.street_ID">
                                            {{ street.street_Name }}</option>
                                    </select>
                                </div>

                            </div>

                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="cancel">Отмена</button>

                        <div :title="!selectedStreet || !newHouseName ? 'Заполните все поля.' : ''">
                            <button type="submit" class="btn btn-primary" @click="createHouse"
                                :disabled="!selectedStreet || !newHouseName">Добавить</button>
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
// import Title from '@/components/Title.vue';
import Footer from '@/components/Footer.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import Alert from '@/components/Alert.vue';
import Loader from '@/components/Loader.vue';


export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newHouseName: '', // Добавьте новое поле для хранения названия нового города
            selectedHouseId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
            alertType: null,
            loading: true,
            streetId: null,
            choises: [],
            selectedStreet: null,
        };
    },

    components: {
        Header,
        // Title,
        Footer,
        // ModalCreate,
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
            // console.log("street.vue show alert", message, type);
        },
        fetchData() {
            axios.get('https://localhost:5001/api/phonebook/listByCity') // Выполняем GET-запрос к серверу
                .then(response => {
                    // const sortedData = response.data.map(house => {
                    //     house.apartments = house.apartments.sort((a, b) => {
                    //         const apartmentNumberA = parseInt(a.apartment_Number, 10);
                    //         const apartmentNumberB = parseInt(b.apartment_Number, 10);
                    //         return apartmentNumberA - apartmentNumberB;
                    //     });
                    //     return house;
                    // });

                    // this.data = sortedData.sort((a, b) => a.house_Number.localeCompare(b.house_Number));
                    this.data = response.data;
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error); // Выводим ошибку в случае неудачи
                })
                .finally(() => {
                    this.loading = false; // Завершаем загрузку
                });
        },

        prepareId(houseId) {
            this.selectedHouseId = houseId;
            console.log(houseId)
        },

        onHouseChanged(message, type) {
            this.showAlert(message, type); // Вызываем showAlert с переданным типом уведомления
            this.fetchData(); // Запрашиваем актуальные данные с сервера
        },

        fetchChoises() {
            axios.get('https://localhost:5001/api/phonebook/listByCity')
                .then(response => {
                    this.choises = response.data; // Предполагается, что полученные данные содержат список городов
                    // Сортируем города по алфавиту
                    // this.streets.sort((a, b) => a.street_Name.localeCompare(b.street_Name));
                    console.log(this.choises); // Вывод отсортированных городов в консоль
                })
                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса для получения городов:', error);
                });
        },

        createHouse() {
            this.fetchChoises();
            this.alertMessage = null; // Сброс сообщения перед выполнением запроса

            const houseData = {
                House_Number: this.newHouseName, // Используйте значение из поля ввода
            };

            const streetIdData = {
                Street_ID: this.selectedStreet, // Используйте значение из поля ввода
            };

            console.log(streetIdData); // Вывод выбранного города в консоль

            axios.post(`https://localhost:5001/api/house/${streetIdData.Street_ID}/`, houseData) // Отправьте POST-запрос
                .then(response => {
                    console.log(response.data);
                    this.data.push(response.data);
                    this.newHouseName = '';
                    this.selectedStreet = null;
                    this.fetchData();
                    this.alertMessage = 'Дом добавлен'; // Установите сообщение об успешном добавлении
                    this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'
                })

                .catch(error => {
                    console.error('Ошибка при выполнении POST запроса:', error);
                    // this.alertMessage = 'Улица уже существует'; // Установите сообщение об ошибке из response.data
                    this.showAlert(error.response.data, 'danger'); // Отображение уведомления с типом 'danger'
                });

            // Закрыть модальное окно с использованием data-bs-dismiss
            document.querySelector('[data-bs-dismiss="modal"]').click();
        },

        cancel() {
            this.newHouseName = ''; // Сброс значения поля
            this.selectedStreet = null; // Сброс значения поля
            // this.selectedStreet = null; // Сброс значения поля
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
</style>