<!-- <template>
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form @submit.prevent="createCity">
                        <div class="mb-3" id="message-text_container">
                            <label for="message-text" class="col-form-label">Введите название:</label>

                            <input v-model="newCityName" type="text"
                                :class="{ 'form-control': true, 'is-invalid': !newCityName, 'is-valid': newCityName }"
                                id="message-text" autocomplete="off">
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>

                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createCity"
                        :disabled="!newCityName">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';

export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newCityName: '', // Добавьте новое поле для хранения названия нового города
            updatedCityId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
        };
    },

    props: {
        title: String, // Определяем свойство title
    },

    methods: {
        createCity() {
            this.alertMessage = null; // Сброс сообщения перед выполнением запроса

            const cityData = {
                City_Name: this.newCityName, // Используйте значение из поля ввода
            };

            axios.post('https://localhost:5001/api/city', cityData) // Отправьте POST-запрос
                .then(response => {
                    // console.log(response.data);
                    // this.data.push(response.data);
                    // this.newCityName = '';
                    // this.fetchData();
                    // this.alertMessage = 'Город добавлен'; // Установите сообщение об успешном добавлении
                    // this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'

                    this.$emit('city-added', response.data); // Отправляем событие с новым городом
                    this.newCityName = '';
                })

                .catch(error => {
                    console.error('Ошибка при выполнении POST запроса:', error);
                    // this.alertMessage = error.response.data; // Установите сообщение об ошибке из response.data
                    // this.showAlert(this.alertMessage, 'danger'); // Отображение уведомления с типом 'danger'
                });
        },
    },
};
</script> -->

<template>
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <form @submit.prevent="handleSubmit">
                        <div class="mb-3" id="message-text_container">
                            <label for="message-text" class="col-form-label">{{ inputLabel }}</label>

                            <input v-model="newItemName" type="text"
                                :class="{ 'form-control': true, 'is-invalid': !newItemName, 'is-valid': newItemName }"
                                id="message-text" autocomplete="off"/>
                        </div>
                    </form>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>

                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="handleSubmit"
                        :disabled="!newItemName">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
 <script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';

export default {
    data() {
        return {
            newItemName: '', // Общее поле для хранения названия нового элемента (город или улица)
            alertMessage: null,
            // apiEndpoint: apiEndpoint
        };
    },

    props: {
        title: String, // Определяем свойство title
        inputLabel: String, // Определяем свойство для текстовой метки поля ввода
        submitButtonText: String, // Определяем свойство для текста кнопки отправки
        apiEndpoint: String, // Добавьте это свойство
        name: String
    },

    methods: {
        handleSubmit() {
            this.alertMessage = null; // Сброс сообщения перед выполнением запроса

            const newItemData = {
                [this.name]: this.newItemName, // Используйте значение из поля ввода
            };

            axios
            .post('https://localhost:5001/api/' + this.apiEndpoint, newItemData) // Отправьте POST-запрос
                .then((response) => {
                    this.$emit('city-added'); // Отправляем событие с новым элементом (городом или улицей)
                    this.newItemName = '';
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Ошибка при выполнении POST запроса:', error);
                });
        },
    },
};
</script>
   