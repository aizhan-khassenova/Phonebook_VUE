<template>
    <div class="row table_container">
        <div class="col-12">
            <div v-if="data">
                <table>
                    <tbody>
                        <!-- <tr v-for="(city, index) in data" :key="index"> -->
                        <tr v-for="(item, index) in data" :key="index">
                            <td>
                                <div id="title_list_btn_container">
                                    <div id="title_list_container">
                                        <h6 class="alphabet">
                                            <!-- <strong class="city-icon" v-if="city.city_Name">{{
                                                city.city_Name.charAt(0) }}</strong> -->
                                            <strong class="city-icon" v-if="item.city_Name || item.street_Name">{{
                                                item.city_Name ? item.city_Name.charAt(0) : item.street_Name.charAt(0)
                                            }}</strong>
                                        </h6>

                                        <!-- <h4><strong>{{ city.city_Name }}</strong></h4> -->
                                        <h4><strong>{{ item.city_Name || item.street_Name }}</strong></h4>
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
                                <ul class="no-bullets-list">
                                    <!-- <li v-for="(street, sIndex) in city.streets" :key="sIndex">
                                        <div class="inner_list_container">
                                            <h6><i class="bi bi-signpost-fill" id="i-list" v-if="street"></i></h6>

                                            <h6><strong>{{ street ? street.street_Name : 'Нет улиц' }}</strong>
                                            </h6>
                                        </div>
                                    </li> -->
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';

export default {
    props: {
        dataType: String, // Добавляем параметр dataType
    },

    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newCityName: '', // Добавьте новое поле для хранения названия нового города
            updatedCityId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
        };
    },

    mounted() {
        // Вызываем fetchData при загрузке компонента
        this.fetchData();
    },

    methods: {
        fetchData() {
            let apiUrl = '';

            // Определяем URL для GET-запроса в зависимости от dataType
            if (this.dataType === 'cities') {
                apiUrl = 'https://localhost:5001/api/city';
            } else if (this.dataType === 'streets') {
                apiUrl = 'https://localhost:5001/api/street'; // Замените на реальный URL для улиц
            }

            axios
                .get(apiUrl)
                .then(response => {
                    // const sortedData = response.data.map(city => {
                    //     city.streets = city.streets.sort((a, b) =>
                    //         a.street_Name.localeCompare(b.street_Name)
                    //     );
                    //     return city;
                    // });

                    // this.data = sortedData.sort((a, b) =>
                    //     a.city_Name.localeCompare(b.city_Name)
                    // );
                    this.data = response.data;
                })
                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error);
                });
        },
    },
};
</script>