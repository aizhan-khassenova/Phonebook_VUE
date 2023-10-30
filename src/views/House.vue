<template>
    <div>
        <Header></Header>
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="col-3" id="title_container">
                            <h1 class="text-start text-primary"><strong>Дома</strong></h1>

                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                                    data-bs-target="#myModal"><strong>+</strong></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" id="table_container">
                    <div class="col-12">
                        <div v-if="data">
                            <table>
                                <tbody>
                                    <tr v-for="(house, index) in data" :key="index">
                                        <td>
                                            <div id="first_column_container">
                                                <div id="sort_name_container">
                                                    <h6 v-if="house.house_Number" id="sort_icon">
                                                        <strong>
                                                            {{ house.house_Number }}
                                                        </strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>
                                                            {{ house.house_Number }}
                                                        </strong>
                                                    </h4>
                                                </div>

                                                <div class="btn-group dropend">
                                                    <button class="btn btn-primary dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false" id="btn-menu">
                                                        <i class="bi bi-three-dots-vertical" id="i-menu"></i>
                                                    </button>

                                                    <ul class="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-update" id="dropdown-upd"
                                                                @click="prepareUpdate(city.city_ID)" href="#">
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
                                                                @click="prepareUpdate(city.city_ID)" href="#">
                                                                <i class="bi bi-trash-fill" id="i-dropdown"></i>
                                                                Удалить город
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <ul id="no-bullets-list">
                                                <li v-for="(apartment, aIndex) in house.apartments" :key="aIndex">
                                                    <div id="second_column_container">
                                                        <h6>
                                                            <i class="bi bi-key-fill" id="i-list" v-if="apartment"></i>
                                                        </h6>

                                                        <h6>
                                                            <strong>
                                                                {{ apartment ? apartment.apartment_Number : 'Нет квартир' }}
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

        <!-- <ModalCreate @item-added="onHouseAdded" title="Добавить дом" inputLabel="Введите номер дома:" apiEndpoint="house"
            name="house_Number"></ModalCreate> -->
        <!-- <ModalCreate @item-added="onStreetAdded" title="Добавить улицу" inputLabel="Введите название улицы:" apiEndpoint="street" name="street_Name"></ModalCreate> -->

        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Добавить улицу</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="createStreet">
                            <div class="mb-3" id="val-cont">
                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="form-label">Город:</label>
                                    <select class="form-select is-invalid" id="validationServer04" required
                                        v-model="selectedCity">
                                        <option selected disabled value="">Выберите...</option>
                                        <option v-for="city in cities" :key="city.city_ID" :value="city.city_ID">{{
                                            city.city_Name }}</option>
                                    </select>
                                </div>

                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="form-label">Город:</label>
                                    <select class="form-select is-invalid" id="validationServer04" required
                                        v-model="selectedCity">
                                        <option selected disabled value="">Выберите...</option>
                                        <option v-for="city in cities" :key="city.city_ID" :value="city.city_ID">{{
                                            city.city_Name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">Введите название:</label>

                                <input v-model="newStreetName" type="text"
                                    :class="{ 'form-control': true, 'is-invalid': !newStreetName, 'is-valid': newStreetName }"
                                    id="message-text" autocomplete="off">
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>

                        <button type="submit" class="btn btn-primary" @click="createStreet"
                            :disabled="!newStreetName">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';
import Header from '@/components/Header.vue';
// import Title from '@/components/Title.vue';
import Footer from '@/components/Footer.vue';
// import ModalCreate from '@/components/ModalCreate.vue';

export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newHouseName: '', // Добавьте новое поле для хранения названия нового города
            updatedHouseId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
        };
    },

    components: {
        Header,
        // Title,
        Footer,
        // ModalCreate,
    },

    mounted() {
        // Вызываем fetchData при загрузке компонента
        this.fetchData();
    },

    methods: {
        fetchData() {
            axios.get('https://localhost:5001/api/house') // Выполняем GET-запрос к серверу
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
        },

        onHouseAdded(newCity) {
            // Обновляем список городов после добавления нового города
            this.data.push(newCity);
            this.fetchData(); // Запрашиваем актуальные данные с сервера
        },
    }
}
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/city.css"></style>

<style scoped>
#val-cont {
    display: flex;
    justify-content: space-between;
}
#val-item {
    text-align: left;
    width: 45%;
} 

#table_container {
    padding: 50px 0;
}

#first_column_container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

#sort_name_container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* border: 1px solid black; */
}

#sort_icon {
    margin-right: 30px;
    text-align: center;
    width: 30px;
    height: 30px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary-color);
    line-height: 30px;
}

#no-bullets-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

#second_column_container {
    display: flex;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
}

#i-list {
    color: var(--primary-color);
    margin-right: 10px;
}
</style>