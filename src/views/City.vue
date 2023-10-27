<template>
    <div>
        <div id="liveAlertPlaceholder"></div>

        <Header></Header>

        <section>
            <div class="container">
                <Title title="Города"></Title>

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
                                                        <strong>
                                                            {{ city.city_Name.charAt(0) }}
                                                        </strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>
                                                            {{ city.city_Name }}
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
                                                <li v-for="(street, sIndex) in city.streets" :key="sIndex">
                                                    <div id="second_column_container">
                                                        <h6>
                                                            <i class="bi bi-signpost-fill" id="i-list" v-if="street"></i>
                                                        </h6>

                                                        <h6>
                                                            <strong>
                                                                {{ street ? street.street_Name : 'Нет улиц' }}
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

        <ModalCreate @item-added="onCityAdded" title="Добавить город" inputLabel="Введите название города:" apiEndpoint="city" name="city_Name"></ModalCreate>

        <div class="modal fade" id="modal-update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Обновление города</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="updateCity">
                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">Введите новое название:</label>

                                <input v-model="newCityName" type="text"
                                    :class="{ 'form-control': true, 'is-invalid': !newCityName, 'is-valid': newCityName }"
                                    id="message-text" autocomplete="off">
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>

                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="updateCity"
                            :disabled="!newCityName">Обновить</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Удалить город?</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body" id="mb-delete">
                        <form @submit.prevent="deleteCity">
                            <label id="l-delete">
                                <h1><i class="bi bi-exclamation-triangle-fill" id="i-danger"></i></h1>
                                Удаление этого города также приведет к удалению его данных.
                            </label>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>

                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            @click="deleteCity">Удалить</button>
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
import Title from '@/components/Title.vue';
import Footer from '@/components/Footer.vue';
import ModalCreate from '@/components/ModalCreate.vue';

export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newCityName: '', // Добавьте новое поле для хранения названия нового города
            updatedCityId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
        };
    },

    components: {
        Header,
        Title,
        Footer,
        ModalCreate,
    },

    mounted() {
        // Вызываем fetchData при загрузке компонента
        this.fetchData();
    },

    methods: {
        showAlert(alertMessage, alertType) {
            const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
            const wrapper = document.createElement('div');

            if (alertMessage) {
                const icon = alertType === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill';

                // Удалите слово "Ошибка" из текста уведомления при ошибке
                alertMessage = alertType === 'danger' ? alertMessage.replace('Ошибка: ', '') : alertMessage;

                wrapper.innerHTML = `
                    <div class="alert alert-${alertType} alert-dismissible" role="alert">
                        <div><i class="bi ${icon}" id="i-check"></i>${alertMessage}</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
                alertPlaceholder.append(wrapper);
            }
            // Добавляем код для автоматического закрытия уведомления через 5 секунд
            setTimeout(() => {
                wrapper.remove(); // Удаляем уведомление из DOM через 5 секунд
            }, 5000);
        },

        fetchData() {
            axios.get('https://localhost:5001/api/city') // Выполняем GET-запрос к серверу
                .then(response => {
                    const sortedData = response.data.map(city => {
                        // Сортируем улицы для каждого города
                        city.streets = city.streets.sort((a, b) => a.street_Name.localeCompare(b.street_Name));
                        return city;
                    });

                    // Сортируем города по имени
                    this.data = sortedData.sort((a, b) => a.city_Name.localeCompare(b.city_Name));
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error); // Выводим ошибку в случае неудачи
                })
        },

        onCityAdded(newCity) {
            // Обновляем список городов после добавления нового города
            this.data.push(newCity);
            this.fetchData(); // Запрашиваем актуальные данные с сервера
        },

        // createCity() {
        //     this.alertMessage = null; // Сброс сообщения перед выполнением запроса

        //     const cityData = {
        //         City_Name: this.newCityName, // Используйте значение из поля ввода
        //     };

        //     axios.post('https://localhost:5001/api/city', cityData) // Отправьте POST-запрос
        //         .then(response => {
        //             console.log(response.data);
        //             this.data.push(response.data);
        //             this.newCityName = '';
        //             this.fetchData();
        //             this.alertMessage = 'Город добавлен'; // Установите сообщение об успешном добавлении
        //             this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'
        //         })

        //         .catch(error => {
        //             console.error('Ошибка при выполнении POST запроса:', error);
        //             this.alertMessage = error.response.data; // Установите сообщение об ошибке из response.data
        //             this.showAlert(this.alertMessage, 'danger'); // Отображение уведомления с типом 'danger'
        //         });
        // },

        prepareUpdate(cityId) {
            this.updatedCityId = cityId;
        },

        updateCity() {
            this.alertMessage = null; // Сброс сообщения перед выполнением запроса

            const cityData = {
                City_Name: this.newCityName,
            };

            // Посылаем PUT-запрос на сервер для обновления города
            axios.put(`https://localhost:5001/api/city/${this.updatedCityId}`, cityData)
                .then(response => {
                    console.log(response.data);
                    // Обновляем данные на клиенте
                    this.fetchData();
                    // Сбрасываем значения
                    this.updatedCityId = null;
                    this.newCityName = '';
                    this.alertMessage = 'Город обновлен'; // Установите сообщение об успешном обновлении
                    this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'
                })
                .catch(error => {
                    console.error('Ошибка при выполнении PUT запроса:', error);
                    this.alertMessage = error.response.data; // Установите сообщение об ошибке из response.data
                    this.showAlert(this.alertMessage, 'danger'); // Отображение уведомления с типом 'danger'
                });
        },

        deleteCity() {
            // this.alertMessage = null; // Сброс сообщения перед выполнением запроса
            // Посылаем Delete-запрос на сервер для удаления города
            axios.delete(`https://localhost:5001/api/city/${this.updatedCityId}`)
                .then(response => {
                    console.log(response.data);
                    // Обновляем данные на клиенте
                    this.fetchData();
                    // Сбрасываем значения
                    // this.updatedCityId = null;
                    // this.newCityName = '';
                    this.alertMessage = 'Город удален'; // Установите сообщение об успешном удалении
                    this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'
                })
                .catch(error => {
                    console.error('Ошибка при выполнении DELETE запроса:', error);
                });
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/city.css"></style>

<style scoped>
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