<template>
    <div>
        <div id="liveAlertPlaceholder"></div>
        <Header></Header>
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div id="title_container">
                            <h1 class="text-start text-primary"><strong>Улицы</strong></h1>

                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                                    data-bs-target="#myModal" @click="fetchCities"><strong>+</strong></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" id="table_container">
                    <div class="col-12">
                        <div v-if="data">
                            <table>
                                <tbody>
                                    <tr v-for="(street, index) in data" :key="index">
                                        <td>
                                            <div id="first_column_container">
                                                <div id="sort_name_container">
                                                    <h6 v-if="street.street_Name" id="sort_icon">
                                                        <strong>
                                                            {{ street.street_Name.charAt(0) }}
                                                        </strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>
                                                            {{ street.street_Name }}
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
                                        </td>

                                        <td>
                                            <ul id="no-bullets-list">
                                                <li v-for="(house, hIndex) in street.houses" :key="hIndex">
                                                    <div id="second_column_container">
                                                        <h6>
                                                            <i class="bi bi-house-door-fill" id="i-list" v-if="house"></i>
                                                        </h6>

                                                        <h6>
                                                            <strong>
                                                                {{ house ? house.house_Number : 'Нет домов' }}
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Добавление улицы</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="createStreet">


                            <div class="mb-3" id="message-text_container">
                                <label for="message-text" class="col-form-label">Улица:</label>

                                <input v-model="newStreetName" type="text"
                                    :class="{ 'form-control': true, 'is-invalid': !newStreetName, 'is-valid': newStreetName }"
                                    id="message-text" autocomplete="off"
                                    :title="newStreetName ? 'Все хорошо!' : 'Заполните это поле.'"
                                    placeholder="Введите название">
                            </div>

                            <div class="mb-3" id="val-cont">
                                <div class="col-md-5" id="val-item">
                                    <label for="validationServer04" class="form-label">Город:</label>

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

                        <button type="submit" class="btn btn-primary" @click="createStreet"
                            :disabled="!selectedCity || !newStreetName">Добавить</button>
                    </div>
                </div>
            </div>
        </div>

        <ModalUpdate @item-updated="onStreetChanged" :itemId="selectedStreetId" title="Обновление улицы" inputLabel="Улица:"
            apiEndpoint="street" name="street_Name" inputplaceholder="Введите название"></ModalUpdate>

        <ModalDelete @item-deleted="onStreetChanged" :itemId="selectedStreetId" title="Удалить улицу?"
            inputLabel="Удаление этой улицы также приведет к удалению ее данных." apiEndpoint="street" name="street_Name"
            inputplaceholder="Введите название"></ModalDelete>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ModalUpdate from '@/components/ModalUpdate.vue';
import ModalDelete from '@/components/ModalDelete.vue';


export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newStreetName: '', // Добавьте новое поле для хранения названия нового города
            cityId: null,
            cities: [],
            selectedCity: null,
            // updatedStreetId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
            selectedStreetId: null, // Добавляем поле для хранения идентификатора обновляемого города
        };
    },

    components: {
        Header,
        Footer,
        ModalUpdate,
        ModalDelete
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
            axios.get('https://localhost:5001/api/street') // Выполняем GET-запрос к серверу
                .then(response => {
                    const sortedData = response.data.map(street => {
                        street.houses = street.houses.sort((a, b) => {
                            // Преобразуем house_Number в числа и сравниваем их
                            const houseNumberA = parseInt(a.house_Number, 10);
                            const houseNumberB = parseInt(b.house_Number, 10);
                            return houseNumberA - houseNumberB;
                        });
                        return street;
                    });

                    // Сортируем города по имени
                    this.data = sortedData.sort((a, b) => a.street_Name.localeCompare(b.street_Name));
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error); // Выводим ошибку в случае неудачи
                })
        },

        // onStreetAdded() {
        //     // Обновляем список городов после добавления нового города
        //     // this.data.push(newCity);
        //     this.fetchData(); // Запрашиваем актуальные данные с сервера
        // },

        onStreetChanged() {
            this.fetchData(); // Запрашиваем актуальные данные с сервера
        },

        prepareId(streetId) {
            this.selectedStreetId = streetId;
            console.log(streetId)
        },

        fetchCities() {
            axios.get('https://localhost:5001/api/city')
                .then(response => {
                    this.cities = response.data; // Предполагается, что полученные данные содержат список городов
                    console.log(this.cities);
                })
                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса для получения городов:', error);
                });
        },

        createStreet() {
            this.fetchCities();
            this.alertMessage = null; // Сброс сообщения перед выполнением запроса

            const streetData = {
                Street_Name: this.newStreetName, // Используйте значение из поля ввода
            };

            const cityIdData = {
                City_ID: this.selectedCity, // Используйте значение из поля ввода
            };

            console.log(cityIdData); // Вывод выбранного города в консоль

            axios.post(`https://localhost:5001/api/street/${cityIdData.City_ID}/`, streetData) // Отправьте POST-запрос
                .then(response => {
                    console.log(response.data);
                    this.data.push(response.data);
                    this.newStreetName = '';
                    this.selectedCity = null;
                    this.fetchData();
                    this.alertMessage = 'Улица добавлена'; // Установите сообщение об успешном добавлении
                    this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'
                })

                .catch(error => {
                    console.error('Ошибка при выполнении POST запроса:', error);
                    this.alertMessage = error.response.data; // Установите сообщение об ошибке из response.data
                    this.showAlert(this.alertMessage, 'danger'); // Отображение уведомления с типом 'danger'
                });

            // Закрыть модальное окно с использованием data-bs-dismiss
            document.querySelector('[data-bs-dismiss="modal"]').click();
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
    height: 35px;
    display: flex;
    align-items: center;
    border: 1px solid black;
}

#i-list {
    color: var(--primary-color);
    margin-right: 10px;
}

#btn-menu {
	margin-right: 50px;
	border-radius: 50%;
	height: 35px;
	width: 35px;
}
</style>